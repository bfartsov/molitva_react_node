const router = require("express").Router();
const mongoose = require("mongoose");
require("../../models/NationalPrayer");
const NationalPrayer = mongoose.model("nationalprayer");
const upload = require("../../helpers/upload");
const resizeImage = require("../../helpers/resize");
const fullUrl = require("../../helpers/fullUrl");
const path = require("path");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

// @route  GET api/nationalprayers
// @access Public
router.get("/", async (req, res, next) => {
  try {
    const nationalPrayer = await NationalPrayer.find();
    console.log(nationalPrayer);

    if (nationalPrayer.length <= 0) {
      return res.status(400).json({
        errors: [
          {
            msg: "Prayer not found",
          },
        ],
      });
    }
    res.status(200).json(nationalPrayer);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// @route  GET api/nationalprayers/:year
// @access Public
router.get("/:year", async (req, res, next) => {
  try {
    const nationalPrayer = await NationalPrayer.findOne({
      year: +req.params.year,
    });
    console.log(nationalPrayer);

    if (!nationalPrayer) {
      return res.status(400).json({
        errors: [
          {
            msg: "Prayer not found",
          },
        ],
      });
    }
    res.status(200).json(nationalPrayer);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// @route  GET api/nationalprayers/id/:id
// @access Public
router.get("/id/:id", async (req, res, next) => {
  try {
    const nationalPrayer = await NationalPrayer.findById(req.params.id);

    if (!nationalPrayer) {
      return res.status(400).json({
        errors: [
          {
            msg: "Prayer not found",
          },
        ],
      });
    }
    res.status(200).json(nationalPrayer);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", upload, auth, async (req, res, next) => {
  try {
    const { text, title, year, video } = req.body;
    if (!req.file) {
      return res.status(400).json({
        errors: [
          {
            msg: "Img is required",
          },
        ],
      });
    }
    console.log(req.file);
    const resizedImg = await resizeImage(req.file, 248, 262);
    const url = fullUrl(req);
    const img = path.join(url, resizedImg.options.fileOut);
    const newPrayer = new NationalPrayer({
      text,
      title,
      year,
      video,
      img,
    });
    const savePrayer = await newPrayer.save();
    res.status(200).json(savePrayer);
  } catch (error) {
    console.log();
    next(error);
  }
});

router.put("/:id", upload, auth, async (req, res, next) => {
  try {
    console.log(req.body);
    const prayer = await NationalPrayer.findById(req.params.id);
    if (!prayer) {
      return res.status(400).json({
        errors: [
          {
            msg: "Prayer not found",
          },
        ],
      });
    }
    if (req.file) {
      const resizedImg = await resizeImage(req.file, 248, 262);
      const url = fullUrl(req);
      const img = path.join(url, resizedImg.options.fileOut);
      prayer.img = img;
    }

    prayer.text = req.body.text;
    prayer.title = req.body.title;
    prayer.video = req.body.video;
    prayer.year = req.body.year;
    const updatedPrayer = await prayer.save();
    return res.status(200).json(updatedPrayer);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await NationalPrayer.findByIdAndDelete(req.param.id);
    return res.status(200).json({
      msg: "Item deleted",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
