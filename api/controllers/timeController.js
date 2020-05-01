const mongoose = require("mongoose");
require("../../models/Timer");
const Timer = mongoose.model("timer");
const ErrorResponse = require("../helpers/errorResponse");

const postTimer = async (req, res, next) => {
  try {
    const timer = await Timer.findOne({ name: "timer" });

    if (!timer) {
      const { date, time } = req.body;
      const newTimer = new Timer({
        date,
        time,
      });
      const timer = await newTimer.save();

      res.status(200).json(timer);
    }
    if (timer) {
      timer.date = req.body.date;
      timer.time = req.body.time;

      const newTimer = await timer.save();

      res.status(200).json(newTimer);
    }
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

const getTimer = async (req, res, next) => {
  try {
    const timer = await Timer.findOne({ name: "timer" });
    if (!timer) {
      return next(new ErrorResponse("No timer", 404));
    }
    res.status(200).json(timer);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};
module.exports = {
  getTimer,
  postTimer,
};
