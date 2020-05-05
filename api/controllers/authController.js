const ErrorResponse = require("../helpers/errorResponse");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { verifyToken, newToken } = require("../middleware/auth");
require("../models/User");

const User = mongoose.model("user");

const register = async (req, res, next) => {
  const { name, username, email, password, password2 } = req.body;

  try {
    const user = await User.findOne({
      email,
    });
    if (user) {
      return next(new ErrorResponse("User Exist", 404));
    }

    if (password !== password2) {
      return next(new ErrorResponse("Password did not much", 404));
    }

    const newUser = {
      name,
      username,
      email,
      password,
    };

    const saveUser = await new User(newUser).save();

    const token = newToken(saveUser);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse(error.message, error.status));
  }
};
const login = async (req, res, next) => {
  const invalid = { message: "Invalid email and passoword combination" };

  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return next(new ErrorResponse(invalid, 404));
    }
    const match = await user.checkPassword(password);
    if (!match) {
      return next(new ErrorResponse(invalid, 404));
    }
    const token = newToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse(error.message, error.status));
  }
};

const me = async (req, res, next) => {
  try {
    if (req.headers && req.headers["x-auth-token"]) {
      // const usertoken = req.headers.authorization;
      // const token = usertoken.split(" ");
      const token = req.headers["x-auth-token"];
      const user = await verifyToken(token);
      if (user) {
        return res.status(200).json(user);
      } else {
        return next(new ErrorResponse("invalid token", 400));
      }
    } else {
      next(new ErrorResponse("Missing token", 400));
    }
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

module.exports = {
  register,
  login,
  me,
};
