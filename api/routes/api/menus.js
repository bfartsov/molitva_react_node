const router = require("express").Router();
const mongoose = require("mongoose");
require("../../models/Menu");
const Menus = mongoose.model("menu");
const { check, validationResult } = require("express-validator");

// @route  GET api/menus
// @access Public
router.get("/", async (req, res) => {
  try {
    const menus = await Menus.find();
    const sortedMenus = menus.sort((a, b) => {
      return a.order - b.order;
    });
    if (menus.length <= 0) {
      return res.status(400).json({
        msg: "No information found"
      });
    }
    res.status(200).json(sortedMenus);
  } catch (error) {}
});
module.exports = router;
