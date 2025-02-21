const jwt = require("jsonwebtoken");
const authUser = async (req, res, next) => {
  const { token } = req.headers; // Extract token from header
  if (!token) {
    return res.json({ success: false, message: "Access denied. Login again." });
  }
  try {
    const token_decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = authUser;
