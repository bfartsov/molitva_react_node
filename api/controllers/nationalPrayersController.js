const mongoose = require("mongoose");
require("../models/NationalPrayer");
const NationalPrayer = mongoose.model("nationalprayer");
const resizeImage = require("../helpers/resize");
const fullUrl = require("../helpers/fullUrl");
const path = require("path");
const ErrorResponse = require("../helpers/errorResponse");

const getPrayers = async (req, res, next) => {
  try {
    const nationalPrayer = await NationalPrayer.find();

    if (nationalPrayer.length <= 0) {
      return next(new ErrorResponse("no Prayer found", 404));
    }
    res.status(200).json(nationalPrayer);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

const getPrayerByYear = async (req, res, next) => {
  try {
    const nationalPrayer = await NationalPrayer.findOne({
      year: +req.params.year,
    });

    if (!nationalPrayer) {
      return next(new ErrorResponse("Prayer not found", 404));
    }
    res.status(200).json(nationalPrayer);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

const getPrayerById = async (req, res, next) => {
  try {
    const nationalPrayer = await NationalPrayer.findById(req.params.id);

    if (!nationalPrayer) {
      return next(new ErrorResponse("Prayer not found", 404));
    }
    res.status(200).json(nationalPrayer);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

const postPrayer = async (req, res, next) => {
  try {
    const { text, title, year, video } = req.body;
    if (!req.file) {
      return next(new ErrorResponse("Image is requied", 400));
    }
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
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};
const putPrayer = async (req, res, next) => {
  try {
    const prayer = await NationalPrayer.findById(req.params.id);
    if (!prayer) {
      return next(new ErrorResponse("Prayer not found", 404));
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
    next(new ErrorResponse(error.message, error.status));
  }
};

const deletePrayer = async (req, res, next) => {
  try {
    await NationalPrayer.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      msg: "Item deleted",
    });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

module.exports = {
  getPrayers,
  getPrayerById,
  getPrayerByYear,
  putPrayer,
  postPrayer,
  deletePrayer,
};