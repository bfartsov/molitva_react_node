const router = require("express").Router();
const upload = require("../../helpers/upload");
const { protect } = require("../../middleware/auth");
const {
  getNews,
  getNewsById,
  getNewsByLink,
  getNewsByNumber,
  postNews,
  putNews,
  deleteNews,
} = require("../../controllers/newsController");

router.route("/").get(getNews).post(protect, upload, postNews);
router.route("/limit/:number").get(getNewsByNumber);
router.route("/id/:id").get(getNewsById);
router.route("/:link").get(getNewsByLink);
router.route("/:id").put(protect, upload, putNews).delete(protect, deleteNews);

module.exports = router;
