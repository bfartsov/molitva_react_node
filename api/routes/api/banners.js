const router = require("express").Router();
const upload = require("../../helpers/upload");
const { protect } = require("../../middleware/auth");
const validObjectId = require("../../middleware/validObjectId");
require("../../models/Banner");
const {
  getBanners,
  getBanner,
  addBanner,
  editBanner,
  deleteBanner,
} = require("../../controllers/bannersController");

router.route("/").get(getBanners);

router.route("/id/:id").get(validObjectId, getBanner);

router.route("/").post(protect, upload, addBanner);

router
  .route("/:id")
  .put(protect, upload, validObjectId, editBanner)
  .delete(protect, validObjectId, deleteBanner);

module.exports = router;
