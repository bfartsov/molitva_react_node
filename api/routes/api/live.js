const router = require("express").Router();
const { getLive, postLive } = require("../../controllers/liveController");
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");

require("../../models/Live");

// @route  GET api/live
// @desc   get live details
// @access Public

router.get("/", getLive);
// @route  Post api/live
// @desc   get live details
// @access Public

router.post("/", auth, postLive);

module.exports = router;
