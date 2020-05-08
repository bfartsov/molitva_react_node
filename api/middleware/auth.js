const mongoose = require("mongoose");

require("../models/User");
const User = mongoose.model("user");
const jwt = require("jsonwebtoken");

const config = require("config");
const jstSecret = config.get("jwToken");
const ErrorResponse = require("../helpers/errorResponse");

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
    return next(new ErrorResponse("No token, authorization denied", 401));
  }

  try {
    const user = await verifyToken(token, config.get("jwToken"));
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(new ErrorResponse("Token is not valid", 401));
  }
};

module.exports = {
  newToken,
  verifyToken,
  protect,
};
