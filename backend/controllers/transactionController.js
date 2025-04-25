const mongoose = require("mongoose");
const StockTransfer = require("../models/stockTransactionModel");
const Inventory = require("../models/inventoryModel");
const Product = require("../models/ProductModel");

class StockTransferController {
  /**
   * Create a new stock transfer between shops
   */
  static async createTransfer(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { productId, fromShopId, toShopId, quantity, size, notes } =
        req.body;
      const userId = req.user?._id;

      // Validate input
      if (!productId || !fromShopId || !toShopId || !quantity) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          error:
            "Missing required fields: productId, fromShopId, toShopId, quantity",
        });
      }

      if (isNaN(quantity) || quantity <= 0) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          error: "Quantity must be a positive number",
        });
      }

      if (fromShopId === toShopId) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          error: "Cannot transfer to the same shop",
        });
      }

      // Verify source inventory exists with sufficient stock
      const sourceInventory = await Inventory.findOne({
        productId,
        shopId: fromShopId,
      }).session(session);

      if (!sourceInventory) {
        await session.abortTransaction();
        return res.status(404).json({
          success: false,
          error: "Product not found in source shop inventory",
        });
      }

      if (sourceInventory.quantity < quantity) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          error: `Insufficient stock. Available: ${sourceInventory.quantity}`,
        });
      }

      // Get product details for transfer record
      const product = await Product.findById(productId).session(session);
      if (!product) {
        await session.abortTransaction();
        return res.status(404).json({
          success: false,
          error: "Product not found",
        });
      }

      // Process the transfer
      const transferOps = [];

      // 1. Deduct from source inventory
      transferOps.push(
        Inventory.updateOne(
          { _id: sourceInventory._id },
          { $inc: { quantity: -quantity } },
          { session }
        )
      );

      // 2. Add to destination inventory (upsert)
      transferOps.push(
        Inventory.findOneAndUpdate(
          { productId, shopId: toShopId },
          { $inc: { quantity: quantity } },
          {
            upsert: true,
            new: true,
            session,
            setDefaultsOnInsert: true,
          }
        )
      );

      // 3. Create transfer record
      const transfer = new StockTransfer({
        product: productId,
        productName: product.name,
        fromShop: fromShopId,
        toShop: toShopId,
        quantity,
        size,
        notes,
        initiatedBy: userId,
        status: "completed",
      });
      transferOps.push(transfer.save({ session }));

      // Execute all operations
      await Promise.all(transferOps);
      await session.commitTransaction();

      // Return populated transfer data
      const result = await StockTransfer.findById(transfer._id)
        .populate("fromShop toShop", "name location")
        .populate("initiatedBy", "name email");

      res.status(201).json({
        success: true,
        message: "Stock transfer completed successfully",
        data: result,
      });
    } catch (error) {
      await session.abortTransaction();
      console.error("Transfer error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Failed to process stock transfer",
      });
    } finally {
      session.endSession();
    }
  }

  /**
   * Get all transfers with optional filtering and pagination
   */
  static async getTransfers(req, res) {
    try {
      const {
        page = 1,
        limit = 20,
        shopId,
        productId,
        dateFrom,
        dateTo,
      } = req.query;

      const filter = {};
      if (shopId) {
        filter.$or = [{ fromShop: shopId }, { toShop: shopId }];
      }
      if (productId) filter.product = productId;

      // Date range filter
      if (dateFrom || dateTo) {
        filter.transferDate = {};
        if (dateFrom) filter.transferDate.$gte = new Date(dateFrom);
        if (dateTo) filter.transferDate.$lte = new Date(dateTo);
      }

      const transfers = await StockTransfer.find(filter)
        .populate("fromShop toShop", "name location")
        .populate("product", "name")
        .populate("initiatedBy", "name email")
        .sort({ transferDate: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const total = await StockTransfer.countDocuments(filter);

      res.json({
        success: true,
        data: transfers,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Get transfers error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Failed to fetch transfers",
      });
    }
  }

  /**
   * Get single transfer by ID
   */
  static async getTransfer(req, res) {
    try {
      const transfer = await StockTransfer.findById(req.params.id)
        .populate("fromShop toShop", "name location contact")
        .populate("initiatedBy", "name email role")
        .populate("product", "name sku category");

      if (!transfer) {
        return res.status(404).json({
          success: false,
          error: "Transfer not found",
        });
      }

      res.json({
        success: true,
        data: transfer,
      });
    } catch (error) {
      console.error("Get transfer error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Failed to fetch transfer details",
      });
    }
  }

  /**
   * Delete and reverse a transfer
   */
  static async deleteTransfer(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const transfer = await StockTransfer.findById(req.params.id).session(
        session
      );
      if (!transfer) {
        await session.abortTransaction();
        return res.status(404).json({
          success: false,
          error: "Transfer not found",
        });
      }

      // Prevent reversal of old transfers (24 hour window)
      const transferAgeHours =
        (Date.now() - transfer.transferDate) / (1000 * 60 * 60);
      if (transferAgeHours > 24) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          error: "Cannot reverse transfers older than 24 hours",
        });
      }

      const reversalOps = [];

      // 1. Add back to source inventory
      reversalOps.push(
        Inventory.updateOne(
          { productId: transfer.product, shopId: transfer.fromShop },
          { $inc: { quantity: transfer.quantity } },
          { session }
        )
      );

      // 2. Remove from destination inventory
      reversalOps.push(
        Inventory.updateOne(
          { productId: transfer.product, shopId: transfer.toShop },
          { $inc: { quantity: -transfer.quantity } },
          { session }
        )
      );

      // 3. Delete the transfer record
      reversalOps.push(
        StockTransfer.deleteOne({ _id: transfer._id }).session(session)
      );

      await Promise.all(reversalOps);
      await session.commitTransaction();

      res.json({
        success: true,
        message: "Transfer reversed and deleted successfully",
      });
    } catch (error) {
      await session.abortTransaction();
      console.error("Delete transfer error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Failed to reverse transfer",
      });
    } finally {
      session.endSession();
    }
  }

  /**
   * Get transfer history for a specific product
   */
  static async getProductTransferHistory(req, res) {
    try {
      const { productId } = req.params;
      const { limit = 50 } = req.query;

      if (!productId) {
        return res.status(400).json({
          success: false,
          error: "Product ID is required",
        });
      }

      const transfers = await StockTransfer.find({ product: productId })
        .populate("fromShop toShop", "name location")
        .sort({ transferDate: -1 })
        .limit(parseInt(limit));

      res.json({
        success: true,
        data: transfers,
      });
    } catch (error) {
      console.error("Get product transfer history error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Failed to fetch transfer history",
      });
    }
  }
}

module.exports = {
  createTransfer: StockTransferController.createTransfer,
  getTransfers: StockTransferController.getTransfers,
  getTransfer: StockTransferController.getTransfer,
  deleteTransfer: StockTransferController.deleteTransfer,
  getProductTransferHistory: StockTransferController.getProductTransferHistory,
  StockTransferController,
};
