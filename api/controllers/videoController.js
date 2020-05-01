const mongoose = require("mongoose");
const resizeImage = require("../helpers/resize");
const fullUrl = require("../helpers/fullUrl");
require("../models/Video");
const Video = mongoose.model("video");
const ErrorResponse = require("../helpers/errorResponse");

const getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find();
    if (videos.length <= 0) {
      return next(new ErrorResponse("No videos found", 404));
    }

    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

const getFeatureVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({ feature: { $in: [req.params.feature] } });
    if (videos.length <= 0) {
      return next(new ErrorResponse("No videos found", 404));
    }

    res.status(200).json(videos);
  } catch (error) {
    next(new ErrorResponse(error.message, error.status));
  }
};

const getVideosByYear = async (req, res, next) => {
  try {
    const videos = await Video.find({ date: +req.params.year });
    if (videos.length === 0) {
      return next(new ErrorResponse("No videos found", 404));
    }

    res.status(200).json(videos);
  } catch (error) {
    console.log(error.message);
    next(new ErrorResponse(error.message, error.status));
  }
};

const getVideosById = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(new ErrorResponse("No videos found", 404));
    }

    res.status(200).json(video);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

const postVideo = async (req, res, next) => {
  try {
    const resizeImg = await resizeImage(req.file, 360, 174);
    const url = fullUrl(req);
    const img = `${url}/${resizeImg.options.fileOut}`;

    const { title, description, video, dateCreated, feature } = req.body;
    let year = new Date(dateCreated).getFullYear();
    const newVideo = new Video({
      title,
      description,
      img,
      video,
      feature,
      dateCreated,
      date: year,
    });
    const saveVideo = await newVideo.save();
    return res.status(200).json(saveVideo);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(new ErrorResponse("No videos found", 404));
    }
    await video.deleteOne();
    return res.status(200).json({
      msg: "Item deleted",
    });
  } catch (error) {
    next(new ErrorResponse(error.message, error.status));
  }
};

const putVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(new ErrorResponse("No videos found", 404));
    }

    const { dateCreated } = req.body;
    let year = new Date(dateCreated).getFullYear();

    const url = fullUrl(req);
    const resizeImg = await resizeImage(req.file, 360, 174);
    const img = `${url}/${resizeImg.options.fileOut}`;

    video.title = req.body.title;
    video.description = req.body.description;
    video.img = img;
    video.date = year;
    video.dateCreated = req.body.dateCreated;
    video.video = req.body.video;
    video.feature = req.body.feature;
    const updatedVideo = await video.save();
    return res.status(200).json(updatedVideo);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, error.status));
  }
};

module.exports = {
  getFeatureVideos,
  getVideos,
  getVideosById,
  getVideosByYear,
  postVideo,
  putVideo,
  deleteVideo,
};
