require("../models/Banner");
const mongoose = require("mongoose");
const fullUrl = require("../helpers/fullUrl");
const Banner = mongoose.model("banner");
const resizeImg = require("../helpers/resize");
const bannerValidationShema = require("../models/bannerValidationSchema");
const ErrorResponse = require("../helpers/errorResponse");

// get all banners
const getBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find();
    if (banners.length <= 0) {
      return next(new ErrorResponse("No banners found", 404));
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
      return next(new ErrorResponse("No banner found", 404));
    }
    res.status(200).json(banner);
  } catch (error) {
    console.log(error.message);
    next(new ErrorResponse(error.message, error.status));
  }
};

// add Banners
const addBanner = async (req, res, next) => {
  try {
    const { error } = bannerValidationShema.validate(req.body);
    let banner = "";
    if (req.file) {
      const url = fullUrl(req);
      const resizedImage = await resizeImg(req.file, 1800, 550);
      banner = `${url}/${resizedImage.options.fileOut}`;
    } else {
      return next(new ErrorResponse("Image is required", 401));
    }
    if (error) {
      error.status = 401;
      return next(new ErrorResponse(error, error.status));
    }

    const newBanner = new Banner({
      title: req.body.title,
      img: banner,
      eventDate: req.body.eventDate,
    });
    const saveBanner = await newBanner.save();
    res.status(200).json(saveBanner);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

// edit banner by ID
const editBanner = async (req, res, next) => {
  try {
    const { error } = bannerValidationShema.validate(req.body);

    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return next(new ErrorResponse("Banner not found", 404));
    }
    if (req.file) {
      const url = fullUrl(req);
      const resizedImage = await resizeImg(req.file, 1800, 550);
      const bannerImg = `${url}/${resizedImage.options.fileOut}`;
      banner.img = bannerImg;
    }
    if (error) next(new ErrorResponse(error, 401));

    banner.title = req.body.title;
    banner.eventDate = req.body.eventDate;
    banner.save();
    res.status(200).json(banner);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

// Delete Banner
const deleteBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return next(new ErrorResponse("Banner not found", 404));
    await banner.deleteOne();
    res.status(200).json({
      msg: "Item deleted",
    });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

module.exports = {
  getBanners,
  getBanner,
  addBanner,
  editBanner,
  deleteBanner,
};
