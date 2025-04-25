const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
