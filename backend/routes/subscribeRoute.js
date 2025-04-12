// routes/subscribeRoutes.js
const express = require("express");
const router = express.Router();
const { subscribeUser } = require("../controllers/subscribeController");

router.post("/subscribe", subscribeUser);

module.exports = router;
