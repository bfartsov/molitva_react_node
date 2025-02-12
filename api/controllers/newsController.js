const mongoose = require("mongoose");
const resizeImage = require("../helpers/resize");
const fullUrl = require("../helpers/fullUrl");
require("../models/News");
const News = mongoose.model("news");
const ErrorResponse = require("../helpers/errorResponse");
const newsValidationSchema = require("../models/newsValidationSchema");
const config = require("config");

const getNews = async (req, res, next) => {
  try {
    const news = await News.find();
    if (news.length <= 0) {
      return next(new ErrorResponse("News not found", 404));
    }
    const CDN = config.get("CDN");
    news.forEach((news) => (news.img = CDN + "/" + news.img));
    res.status(200).json(news);
  } catch (error) {
    next(new ErrorResponse(error.message, error.status));
  }
};

const getNewsByNumber = async (req, res, next) => {
  try {
    const news = await News.find().limit(+req.params.number);
    if (news.length <= 0) {
      return next(new ErrorResponse("News not found", 404));
    }
    const CDN = config.get("CDN");
    news.forEach((news) => (news.img = CDN + "/" + news.img));
    res.status(200).json(news);
  } catch (error) {
    console.log(error.message);
    next(new ErrorResponse(error.message, error.status));
  }
};
const getNewsById = async (req, res, next) => {
  try {
    const singleNews = await News.findById(req.params.id);
    if (!singleNews) {
      return next(new ErrorResponse("News not found", 404));
    }
    return res.status(200).json(singleNews);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};
const getNewsByLink = async (req, res, next) => {
  try {
    const singleNews = await News.findOne({ link: req.params.link });
    if (!singleNews) {
      return next(new ErrorResponse("News not found", 404));
    }
    return res.status(200).json(singleNews);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

const postNews = async (req, res, next) => {
  try {
    const { error } = newsValidationSchema.validate(req.body, {
      allowUnknown: true,
    });
    if (error) {
      console.log(error);
      return next(new ErrorResponse(error.message, 400));
    }
    const resizedImg = await resizeImage(req.file, 248, 262);
    const image = resizedImg.options.fileOut.split("/");

    const img = image[2];

    const { title, text, link } = req.body;
    const newNews = new News({
      title,
      text,
      link,
      img,
    });
    const saveNews = await newNews.save();
    return res.status(200).json(saveNews);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

const putNews = async (req, res, next) => {
  try {
    const { error } = newsValidationSchema.validate(req.body, {
      allowUnknown: true,
    });
    if (error) {
      console.log(error);
      return next(new ErrorResponse(error.message, 400));
    }
    const resizedImg = await resizeImage(req.file, 248, 262);
    const image = resizedImg.options.fileOut.split("/");

    const img = image[2];
    const { title, text, link } = req.body;
    const singleNews = await News.findById(req.params.id);
    if (!singleNews) {
      return next(new ErrorResponse("News not found", 404));
    }
    singleNews.title = title;
    singleNews.text = text;
    singleNews.link = link;
    singleNews.img = img;
    const updatedNews = await singleNews.save();
    return res.status(200).json(updatedNews);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

const deleteNews = async (req, res, next) => {
  try {
    const singleNews = await News.findById(req.params.id);
    if (!singleNews) {
      return next(new ErrorResponse("News not found", 404));
    }
    await singleNews.deleteOne();
    return res.status(200).json({
      msg: "Item deleted",
    });
  } catch (errors) {
    next(new ErrorResponse(error.message, error.status));
  }
};

module.exports = {
  deleteNews,
  getNews,
  getNewsById,
  getNewsByLink,
  getNewsByNumber,
  putNews,
  postNews,
};
