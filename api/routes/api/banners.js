const router = require("express").Router();
const upload = require("../../helpers/upload");
const { protect } = require("../../middleware/auth");
require("../../models/Banner");
const {
  getBanners,
  getBanner,
  addBanner,
  editBanner,
  deleteBanner,
} = require("../../controllers/bannersController");

router.route("/").get(getBanners);

router.route("/:id").get(getBanner);

router.route("/").post(protect, upload).post(addBanner);
router.route("/:id").post(protect, upload).put(editBanner).delete(deleteBanner);

module.exports = router;
