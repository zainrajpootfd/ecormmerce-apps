const express = require("express");
const router = express.Router();
const {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
} = require("../controllers/shopController"); // Correct import

// Route handlers
router.post("/create", createShop); // POST to create a shop
router.get("/", getAllShops); // GET to get all shops
router.get("/:id", getShopById); // GET to get a single shop by ID
router.put("/:id", updateShop); // PUT to update a shop
router.delete("/:id", deleteShop); // DELETE to remove a shop

module.exports = router;
