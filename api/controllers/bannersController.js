require("../models/Banner");
const mongoose = require("mongoose");
const path = require("path");
const fullUrl = require("../helpers/fullUrl");
const Banner = mongoose.model("banner");
const resizeImg = require("../helpers/resize");

const { validationResult } = require("express-validator");
// get all banners
const getBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find();
    if (banners.length > 0) {
      return res.status(400).json({
        errors: [
          {
            msg: "No banners"
          }
        ]
      });
    }
    res.status(200).json(banners);
  } catch (error) {
    console.log(error);
  }
};
// get a banner by ID
const getBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(400).json({
        errors: [
          {
            msg: "Banner does not exist"
          }
        ]
      });
    }
    res.status(200).json(banner);
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
};

// add Banners
const addBanner = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }
  try {
    const url = fullUrl(req);
    const resizedImage = await resizeImg(req.file, 1800, 550);
    const banner = path.join(url, resizedImage.options.fileOut);

    const newBanner = new Banner({
      title: req.body.title,
      img: banner
    });
    const saveBanner = await newBanner.save();
    res.status(200).json(saveBanner);
  } catch (error) {
    res.status(400).json({
      errors: [
        {
          msg: error.message
        }
      ]
    });
  }
};

// edit banner by ID
const editBanner = async (req, res, next) => {
  try {
    const url = fullUrl(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    const resizedImage = await resizeImg(req.file, 1800, 550);
    const bannerImg = path.join(url, resizedImage.options.fileOut);
    const banner = await Banner.findById(req.params.id);
    banner.title = req.body.title;
    banner.img = bannerImg;
    banner.save();
    res.status(200).json(banner);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// Delete Banner
const deleteBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    await banner.remove();
    res.status(200).json({
      msg: "Item deleted"
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = {
  getBanners,
  getBanner,
  addBanner,
  editBanner,
  deleteBanner
};
