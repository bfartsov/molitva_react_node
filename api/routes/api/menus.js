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
    if (menus.length <= 0) {
      return res.status(400).json({
        msg: "No menus found"
      });
    }
    const sortedMenus = menus.sort((a, b) => {
      return a.order - b.order;
    });

    res.status(200).json(sortedMenus);
  } catch (error) {}
});


router.get("/id/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const menu = await Menus.findById(req.params.id);
    console.log(menu);
    if (!menu) {
      return res.status(400).json({
        msg: "No menu found"
      });
    }
    res.status(200).json(menu);
  } catch (error) {}
});

module.exports = router;
