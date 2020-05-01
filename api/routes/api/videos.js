const router = require("express").Router();
const upload = require("../../helpers/upload");
const { protect } = require("../../middleware/auth");

const {
  getFeatureVideos,
  getVideos,
  getVideosById,
  getVideosByYear,
  postVideo,
  putVideo,
  deleteVideo,
} = require("../../controllers/videoController");

router.route("/").get(getVideos).post(protect, upload, postVideo);
router.route("/:feature").get(getFeatureVideos);
router.route("/year/:year").get(getVideosByYear);
router.route("/id/:id").get(getVideosById);
router
  .route("/:id")
  .put(protect, upload, putVideo)
  .delete(protect, deleteVideo);

module.exports = router;
