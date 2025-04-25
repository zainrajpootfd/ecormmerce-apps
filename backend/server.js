require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const userRoute = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
const subscriberRouter = require("./routes/subscribeRoute");
const shopRouter = require("./routes/shopRoute");
const InventoryRouter = require("./routes/inventoryRoute");
const transactionRouter = require("./routes/transactionRoute");

const app = express();
const Port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API routes
app.use("/api/user", userRoute);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/user", subscriberRouter);
app.use("/api/shops", shopRouter);
app.use("/api/inventory", InventoryRouter);
app.use("/api/transactions", transactionRouter);

// Start server
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
