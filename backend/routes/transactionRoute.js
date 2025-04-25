const express = require("express");
const router = express.Router();
const {
  createTransfer,
  getTransfers,
  getTransfer,
  deleteTransfer,
} = require("../controllers/transactionController");

// Create a transfer
router.post("/", createTransfer);

// Get all transfers
router.get("/", getTransfers);

// Get single transfer
router.get("/:id", getTransfer);

// Delete transfer
router.delete(
  "/:id",

  deleteTransfer
);

module.exports = router;
