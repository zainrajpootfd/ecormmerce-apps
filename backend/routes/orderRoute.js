const express = require("express");
const {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  updateStatus,
  userOrder,
  verifyStripe,
} = require("../controllers/orderController");
const adminAuth = require("../middlewares/adminAuth");
const userAuth = require("../middlewares/auth");
const orderRouter = express.Router();

// Admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// User features
orderRouter.post("/place", userAuth, placeOrder);
orderRouter.post("/stripe", userAuth, placeOrderStripe);
orderRouter.post("/razorpay", userAuth, placeOrderRazorpay);
orderRouter.post("/userOrders", userAuth, userOrder);

// Verify Stripe
orderRouter.post("/verifyStripe", userAuth, verifyStripe);

module.exports = orderRouter;
