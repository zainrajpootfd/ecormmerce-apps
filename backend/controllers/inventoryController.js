const Inventory = require("../models/inventoryModel");

// @desc    Create new inventory item
// @route   POST /api/inventory
// @access  Private
exports.createInventory = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.shopId || !req.body.productId || !req.body.quantity) {
      return res
        .status(400)
        .json({
          error: "Missing required fields (shopId, productId, quantity)",
        });
    }

    // Check for existing inventory item
    const existingItem = await Inventory.findOne({
      shopId: req.body.shopId,
      productId: req.body.productId,
    });

    if (existingItem) {
      return res.status(400).json({
        error: "This product already exists in the shop inventory",
      });
    }

    // Validate quantity
    if (req.body.quantity < 0) {
      return res.status(400).json({ error: "Quantity cannot be negative" });
    }

    const inventory = new Inventory(req.body);
    await inventory.save();

    res.status(201).json({
      success: true,
      data: inventory,
    });
  } catch (error) {
    console.error("Error creating inventory:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Server error",
    });
  }
};

// @desc    Update inventory item
// @route   PATCH /api/inventory/:id
// @access  Private
exports.updateInventory = async (req, res) => {
  try {
    // Validate quantity if provided
    if (req.body.quantity && req.body.quantity < 0) {
      return res.status(400).json({ error: "Quantity cannot be negative" });
    }

    const inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        lastUpdated: Date.now(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!inventory) {
      return res.status(404).json({
        success: false,
        error: "Inventory item not found",
      });
    }

    res.json({
      success: true,
      data: inventory,
    });
  } catch (error) {
    console.error("Error updating inventory:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Server error",
    });
  }
};

// @desc    Get all inventory items
// @route   GET /api/inventory
// @access  Private
exports.getAllInventory = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Query
    const query = {};

    // Optional shop filter
    if (req.query.shopId) {
      query.shopId = req.query.shopId;
    }

    // Optional product filter
    if (req.query.productId) {
      query.productId = req.query.productId;
    }

    const items = await Inventory.find(query)
      .skip(skip)
      .limit(limit)
      .populate("shopId", "name location")
      .populate("productId", "name price category")
      .sort({ dateAdded: -1 });

    const total = await Inventory.countDocuments(query);

    res.json({
      success: true,
      count: items.length,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: items,
    });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Server error",
    });
  }
};

// @desc    Get inventory by shop
// @route   GET /api/inventory/shop/:shopId
// @access  Private
exports.getInventoryByShop = async (req, res) => {
  try {
    const items = await Inventory.find({ shopId: req.params.shopId })
      .populate("productId", "name price category")
      .sort({ dateAdded: -1 });

    if (!items || items.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No inventory found for this shop",
      });
    }

    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("Error fetching shop inventory:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Server error",
    });
  }
};

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
// @access  Private
exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);

    if (!inventory) {
      return res.status(404).json({
        success: false,
        error: "Inventory item not found",
      });
    }

    res.json({
      success: true,
      data: {},
      message: "Inventory item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting inventory:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Server error",
    });
  }
};

// @desc    Get low stock items (quantity below threshold)
// @route   GET /api/inventory/low-stock
// @access  Private
exports.getLowStockItems = async (req, res) => {
  try {
    const threshold = req.query.threshold || 5; // Default threshold

    const items = await Inventory.find({
      quantity: { $lt: threshold },
    })
      .populate("shopId", "name")
      .populate("productId", "name price")
      .sort({ quantity: 1 });

    res.json({
      success: true,
      threshold,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("Error fetching low stock items:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Server error",
    });
  }
};
