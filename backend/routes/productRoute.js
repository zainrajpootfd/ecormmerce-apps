const express = require("express");
const {
  addProduct,
  singleProduct,
  listProduct,
  removeProduct,
} = require("../controllers/productController");
const Upload = require("../middlewares/multer");
const adminAuth = require("../middlewares/adminAuth");

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  Upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProduct);
productRouter.post("/remove", adminAuth, removeProduct);

module.exports = productRouter;
