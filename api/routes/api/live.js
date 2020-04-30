const router = require("express").Router();
const { getLive, postLive } = require("../../controllers/liveController");
const { protect } = require("../../middleware/auth");

require("../../models/Live");

router.route("/").get(getLive).post(protect, postLive);

module.exports = router;
