const router = require("express").Router();
const { getLive, postLive } = require("../../controllers/liveController");
const { protect } = require("../../middleware/auth");

require("../../models/Live");

// @route  GET api/live
// @desc   get live details
// @access Public

router.get("/", getLive);
// @route  Post api/live
// @desc   get live details
// @access Public

router.post("/", protect, postLive);

module.exports = router;
