const express = require("express");
const router = express.Router();
const config = require("config");
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

require("../../models/User");
const User = mongoose.model("user");

// @route  POST api/auth
// @desc   register a user
// @access Public

router.post(
  "/register",
  [
    check("email", "Please add valid Email")
      .isEmail()
      .exists(),
    check("username", "Please add a userName").exists(),
    check("password", "Please add password").exists()
  ],

  async (req, res) => {
    const { name, username, email, password, password2 } = req.body;

    try {
      const user = await User.findOne({
        email
      });
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: "User exist"
            }
          ]
        });
      }

      if (password !== password2) {
        return res.status(400).json({
          errors: [
            {
              msg: "Password do not match"
            }
          ]
        });
      }

      const newUser = {
        name,
        username,
        email,
        password
      };
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await new User(newUser).save();

      const payload = {
        name,
        username,
        email
      };

      jwt.sign(
        payload,
        config.get("jwToken"),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw Error;
          res.json({
            token
          });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);
// @route  POST api/auth
// @desc   Login
// @access Public

router.post(
  "/login",
  [
    check("email", "Please add valid Email address")
      .isEmail()
      .exists(),
    check("password", "Please enter a password").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      return res.status(400).json({
        error: errors.array()
      });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        email
      });
      if (!user) {
        return res.status(400).json({
          error: [
            {
              msg: "Invalid credential"
            }
          ]
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          error: [
            {
              msg: "Invalid credential"
            }
          ]
        });
      }

      const payload = {
        user: {
          email: user.email,
          name: user.name,
          username: user.username
        }
      };
      jwt.sign(
        payload,
        config.get("jwToken"),
        {
          expiresIn: 360000000
        },
        (err, token) => {
          if (err) throw Error;
          return res.json({
            user: payload.user,
            token
          });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).json({
        errors: [{ msg: error }]
      });
    }
  }
);

module.exports = router;
