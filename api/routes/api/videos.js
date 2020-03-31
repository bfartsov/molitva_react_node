const router = require("express").Router();
const mongoose = require("mongoose");
const upload = require("../../helpers/upload");
const resizeImage = require("../../helpers/resize");
const fullUrl = require("../../helpers/fullUrl");
const path = require("path");
require("../../models/Video");
const Video = mongoose.model("video");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route  GET api/Videos
// @desc   Get all videos
// @access Public

router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    if (videos.length === 0) {
      return res.status(200).json({
        msg: "No Videos"
      });
    }

    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
});
// @route  GET api/Videos/feature
// @desc   Get all featured videos
// @access Public

router.get("/:feature", async (req, res) => {
  try {
    const videos = await Video.find({ feature: { $in: [req.params.feature] } });
    if (videos.length === 0) {
      return res.status(200).json({
        msg: "No Videos"
      });
    }

    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
});
// @route  GET api/videos
// @desc   Get video by Id
// @access Public

router.get(
  "/year/:year",

  async (req, res) => {
    try {
      const videos = await Video.find({ date: +req.params.year });
      if (videos.length === 0) {
        return res.status(400).json({
          error: [
            {
              msg: "Videos not found"
            }
          ]
        });
      }

      res.status(200).json(videos);
    } catch (error) {
      console.log(error.message);
      res.json(error.message);
    }
  }
);
// @route  GET api/videos
// @desc   Get video by Id
// @access Public

router.get(
  "/id/:id",
  check("id", "Invalid Id")
    .isMongoId()
    .trim(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        return res.status(200).json({
          msg: "Video not found"
        });
      }

      res.status(200).json(video);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error
      });
    }
  }
);
// @route  GET api/videos
// @desc   Create video
// @access private

router.post(
  "/",

  auth,
  upload,
  async (req, res) => {

    
    try {
      const resizeImg = await resizeImage(req.file, 360, 174);
      const url = fullUrl(req);
      const img = path.join(url, resizeImg.options.fileOut);
      const { title, description, video, dateCreated, feature } = req.body;
      console.log(req.body)
      let year = new Date(dateCreated).getFullYear();
      const newVideo = new Video({
        title,
        description,
        img,
        video,
        feature,
        dateCreated,
        date: year
      });
      const saveVideo = await newVideo.save();
      return res.status(200).json(saveVideo);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error
      });
    }
  }
);

router.put(
  "/:id",
  // [
  //   check("title", "Title is required").exists(),
  //   check("description", "description is required").exists(),
  //   check("video", "Video URL is required").exists(),
  //   check("date", "Date is required").exists(),
  //   check("id", "Invalid ID")
  //     .isMongoId()
  //     .trim()
  // ],
  upload,
  auth,
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({
    //     errors: errors.array()
    //   });
    // }

    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        return res.status(400).json({
          errors: [
            {
              msg: "Video not found"
            }
          ]
        });
      };

      const { dateCreated} = req.body;
      let year = new Date(dateCreated).getFullYear();

      const url = fullUrl(req);
      const resizeImg = await resizeImage(req.file, 360, 174);
      const img = resizeImg.options.fileOut.split("/");
      const cdn = path.join(url, resizeImg.options.fileOut);
      video.title = req.body.title;
      video.description = req.body.description;
      video.img = cdn;
      video.date = year;
      video.dateCreated = req.body.dateCreated;
      video.video = req.body.video;
      video.feature = req.body.feature
      const updatedVideo = await video.save();
      return res.status(200).json(updatedVideo);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error
      });
    }
  }
);
// @route  Delete api/Video/id
// @desc   Delete single Video
// @access Private

router.delete(
  "/:id",
  check("id", "Invalid Id")
    .isMongoId()
    .trim(),
  auth,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array()
        });
      }
      const video = await Video.findById(req.params.id);
      if (!video) {
        return res.status(404).json({
          errors: [
            {
              msg: "Video not found"
            }
          ]
        });
      }
      await video.deleteOne();
      return res.status(200).json({
        msg: "Item deleted"
      });
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router;
