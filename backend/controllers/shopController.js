const Shop = require("../models/shopModel");

// Function to create a new shop
const createShop = async (req, res) => {
  try {
    // Destructure request body
    const { name, location } = req.body;

    // Validate input
    if (!name || !location) {
      return res
        .status(400)
        .json({ message: "Name and location are required" });
    }

    // Check if a shop with the same name already exists
    const existingShop = await Shop.findOne({ name });
    if (existingShop) {
      return res
        .status(409)
        .json({ message: "Shop with this name already exists" });
    }
    // Create new shop instance
    const newShop = new Shop({
      name,
      location,
    });

    // Save shop to the database
    await newShop.save();

    // Send success response with created shop data
    res
      .status(201)
      .json({ message: "Shop created successfully", shop: newShop });
  } catch (err) {
    // Log the error for debugging
    console.error("Error creating shop:", err);

    // Send error response
    res
      .status(500)
      .json({ message: "Error creating shop", error: err.message });
  }
};

// Function to get all shops
const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json(shops);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching shops", error: err.message });
  }
};

// Function to get a single shop by ID
const getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.status(200).json(shop);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching shop", error: err.message });
  }
};

// Function to update shop details
const updateShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.status(200).json({ message: "Shop updated successfully", shop });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating shop", error: err.message });
  }
};

// Function to delete a shop
const deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting shop", error: err.message });
  }
};

// Exporting all functions
module.exports = {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
};
