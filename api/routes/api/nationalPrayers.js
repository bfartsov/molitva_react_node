const router = require("express").Router();
const upload = require("../../helpers/upload");
const { protect } = require("../../middleware/auth");
const {
  getPrayerById,
  getPrayerByYear,
  getPrayers,
  postPrayer,
  putPrayer,
  deletePrayer,
} = require("../../controllers/nationalPrayersController");

router.route("/").get(getPrayers).post(upload, protect, postPrayer);
router.route("/:year").get(getPrayerByYear);
router.route("/id/:id").get(getPrayerById);
router
  .route("/:id")
  .put(upload, protect, putPrayer)
  .delete(protect, deletePrayer);

module.exports = router;
