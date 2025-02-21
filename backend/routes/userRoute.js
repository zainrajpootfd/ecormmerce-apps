const express = require("express");
const {
  registerUser,
  loginUser,
  admin,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", admin);

module.exports = userRouter;
