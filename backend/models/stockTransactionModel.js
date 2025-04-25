const mongoose = require("mongoose");

const stockTransactionSchema = new mongoose.Schema({
  inventory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
  change: Number,
  type: { type: String, enum: ["add", "remove", "adjust"], required: true },
  note: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("StockTransaction", stockTransactionSchema);
