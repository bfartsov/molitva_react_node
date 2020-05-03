const mongoose = require("mongoose");

require("../models/User");
const User = mongoose.model("user");
const jwt = require("jsonwebtoken");

const config = require("config");
const jstSecret = config.get("jwToken");

const newToken = (user) => {
  return jwt.sign({ id: user._id }, jstSecret, {
    expiresIn: 3600,
  });
};
const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, jstSecret, async (err, payload) => {
      if (err) return reject(err);
      const user = await User.findOne({ _id: payload.id }).select("-password");
      return resolve(user);
    });
  });

const protect = async (req, res, next) => {
  /// get the token from the header

  const token = req.header("x-auth-token");
  // check if no token
  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization denied",
    });
  }

  try {
    const user = await verifyToken(token, config.get("jwToken"));
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token is not valid",
    });
  }
};

module.exports = {
  newToken,
  verifyToken,
  protect,
};
