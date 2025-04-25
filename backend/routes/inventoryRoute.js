const express = require("express");
const router = express.Router();
const {
  createInventory,
  updateInventory,
  getAllInventory,
  deleteInventory,
  getInventoryByShop,
  getLowStockItems,
} = require("../controllers/inventoryController");

router.post("/", createInventory);
router.patch("/:id", updateInventory);
router.get("/", getAllInventory);
router.get("/shop/:shopId", getInventoryByShop);
router.delete("/:id", deleteInventory);
router.get("/low-stock", getLowStockItems);

module.exports = router;
