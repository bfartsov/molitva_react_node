const router = require("express").Router();
const mongoose = require("mongoose");
const upload = require("../../helpers/upload");
const resizeImage = require("../../helpers/resize");
const fullUrl = require("../../helpers/fullUrl");
const path = require("path");
require("../../models/News");
const News = mongoose.model("news");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route  GET api/news
// @desc   Get all news
// @access Private

router.get(
  "/",

  async (req, res, next) => {
    try {
      const news = await News.find();
      if (news.length <= 0) {
        return res.status(400).json({
          msg: "No information found"
        });
      }
      res.status(200).json(news);
    } catch (error) {
      next(error)
    }
  }
);
// @route  GET api/news/filter/numer
// @desc   Get sertern number of nuews
// @access Public

router.get(
  "/limit/:number",

  async (req, res, next) => {
    try {
      const news = await News.find().limit(+req.params.number);
      if (news.length === 0) {
        return res.status(400).json({
          error: [
            {
              msg: "News not found"
            }
          ]
        });
      }

      res.status(200).json(news);
    } catch (error) {
      console.log(error.message);
      next(error)
    }
  }
);

// @route  GET api/news/id
// @desc   Get single news
// @access Private

router.get(
  "/id/:id",
  check("id", "Invalid Id")
    .isMongoId()
    .trim(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array()
        });
      }
      const singleNews = await News.findById(req.params.id);
      if (!singleNews) {
        return res.status(400).json({
          errors: [
            {
              msg: "News not found"
            }
          ]
        });
      }
      return res.status(200).json(singleNews);
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
);
// @route  GET api/news/id
// @desc   Get single news
// @access Private

router.get(
  "/:link",

  async (req, res, next) => {
    try {
      const singleNews = await News.findOne({ link: req.params.link });
      if (!singleNews) {
        return res.status(400).json({
          errors: [
            {
              msg: "News not found"
            }
          ]
        });
      }
      return res.status(200).json(singleNews);
    } catch (error) {
      console.log(error);

      next(error)
    }
  }
);
// @route  POST api/news/id
// @desc  Create news
// @access Private
router.post(
  "/",
  
  upload,
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }

    try {
      const resizedImg = await resizeImage(req.file, 248, 262);
      const url = fullUrl(req);
      const img = path.join(url, resizedImg.options.fileOut);
      const { title, text, link } = req.body;
      const newNews = new News({
        title, 
        text,
        link,
        img
      });
      const saveNews = await newNews.save();
      return res.status(200).json(saveNews);
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
);
// @route  Put api/news/id
// @desc  Edit news by ID
// @access Private

router.put(
  "/:id",
  [
    // check('title', 'Title is required').exists(),
    // check('text', 'Text is required').exists(),
    // check('link', 'Link is required').exists(),
    // check('img', 'Link is required').exists(),
    check("id", "Invalid Id")
      .isMongoId()
      .trim()
  ],
  upload,
  auth,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }

    try {
      const resizedImg = await resizeImage(req.file, 248, 262);
      const url = fullUrl(req);
      const img = path.join(url, resizedImg.options.fileOut);
      const { title, text, link } = req.body;
      const singleNews = await News.findById(req.params.id);
      if (!singleNews) {
        return res.status(400).json({
          errors: [
            {
              msg: "News not found"
            }
          ]
        });
      }
      singleNews.title = title;
      singleNews.text = text;
      singleNews.link = link;
      singleNews.img = img;
      const updatedNews = await singleNews.save();
      return res.status(200).json(updatedNews);
    } catch (error) {
      console.log(error);
      next(error)
     
    }
  }
);
// @route  Delete api/news/id
// @desc   Delete single news
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
      const singleNews = await News.findById(req.params.id);
      if (!singleNews) {
        return res.status(404).json({
          errors: [
            {
              msg: "News not found"
            }
          ]
        });
      }
      await singleNews.deleteOne();
      return res.status(200).json({
        msg: "Item deleted"
      });
    } catch (errors) {
      next(error)
    }
  }
);
module.exports = router;
