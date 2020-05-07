const mongoose = require("mongoose");
require("../models/Live");
const Live = mongoose.model("live");
const ErrorResponse = require("../helpers/errorResponse");
const liveValidationSchema = require("../models/liveValidationSchema");

const getLive = async (req, res, next) => {
  try {
    const live = await Live.find();
    if (live.length <= 0) {
      return next(new ErrorResponse("live not found"), 404);
    }
    res.status(200).json(live[0]);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};
const postLive = async (req, res, next) => {
  try {
    const { error } = liveValidationSchema.validate(req.body, {
      allowUnknown: true,
    });
    if (error) {
      console.log(error);
      return next(new ErrorResponse(error.message, 400));
    }
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
    next(new ErrorResponse(error.message, error.status));
  }
};

module.exports = {
  getLive,
  postLive,
};
