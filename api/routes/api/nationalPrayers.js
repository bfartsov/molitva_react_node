const router = require("express").Router();
const mongoose = require("mongoose");
require("../../models/NationalPrayer");
const NationalPrayer = mongoose.model("nationalprayer");
const { check, validationResult } = require("express-validator");

// @route  GET api/nationalprayers
// @access Public
router.get("/", async (req, res) => {
  try {
    const nationalPrayer = await NationalPrayer.find();
    console.log(nationalPrayer);

    if (nationalPrayer.length <= 0) {
      return res.status(400).json({
        msg: "No prayers"
      });
    }
    res.status(200).json(nationalPrayer);
  } catch (error) {
    console.log(error);
  }
});

// @route  GET api/nationalprayers/:year
// @access Public
router.get("/:year", async (req, res) => {
  try {
    const nationalPrayer = await NationalPrayer.findOne({
      year: +req.params.year
    });
    console.log(nationalPrayer);

    if (!nationalPrayer) {
      return res.status(400).json({
        msg: "No prayers"
      });
    }
    res.status(200).json(nationalPrayer);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
