const StockTransaction = require("../models/stockTransactionModel");

exports.createTransaction = async (req, res) => {
  const transaction = new StockTransaction(req.body);
  await transaction.save();
  res.status(201).json(transaction);
};

exports.getTransactions = async (req, res) => {
  const transactions = await StockTransaction.find().populate("inventory");
  res.json(transactions);
};
