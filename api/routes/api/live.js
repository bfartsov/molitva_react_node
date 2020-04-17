const router = require("express").Router();
const mongoose = require("mongoose");
require("../../models/Live");
const Live = mongoose.model("live");
const { check, validationResult } = require("express-validator");

// @route  GET api/live
// @desc   get live details
// @access Public

router.get("/", async (req, res, next) => {
  try {
    const live = await Live.find();
    if (live.length <= 0) {
      res.status(400).json({
        error: {
          msg: "no live info ",
        },
      });
    }
    res.status(200).json(live[0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// @route  Post api/live
// @desc   get live details
// @access Public

router.post(
  "/",

  async (req, res, next) => {
    try {
      console.log(req.body);
      const live = await Live.find();
      // if live does not exist create it
      if (live.length <= 0) {
        const { url, type, player, text } = req.body;
        const newLive = new Live({
          url,
          type,
          player,
          text,
        });
        const savedLive = await newLive.save();
        return res.status(200).json(savedLive);
      }

      // if live exist update it
      if (live) {
        const live = await Live.findOne({
          name: "live",
        });
        live.url = req.body.url;
        live.type = req.body.type;
        live.player = req.body.player;
        live.text = req.body.text;
        const updatedLive = await live.save();
        return res.status(200).json(updatedLive);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = router;
