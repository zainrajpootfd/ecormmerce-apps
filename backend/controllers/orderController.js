const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const Stripe = require("stripe");

const currency = "usd";
const deliveryCharges = 10;
//gateway intialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//place order with COD
const placeOrder = async (req, res) => {
  try {
    const { userId, amount, address, items } = req.body;

    const orderData = {
      userId,
      amount,
      address,
      items,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { orderData: {} });
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// place order with stripe
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, amount, address, items } = req.body;
    const { origin } = req.headers;
    const fallbackOrigin = "http://localhost:5173"; // Example fallback for local development
    const redirectOrigin = origin || fallbackOrigin;
    const orderData = {
      userId,
      amount,
      address,
      items,
      paymentMethod: "stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// place order with razorpay
const placeOrderRazorpay = async (req, res) => {};

// All orders  for admin
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// update order status for admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//userORder for frontend

const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  updateStatus,
  userOrder,
  verifyStripe,
};
