const express = require("express");
const router = express.Router();

const { protect } = require("../../middleware/auth");
const { getTimer, postTimer } = require("../../controllers/timeController");

router.route("/").get(getTimer).post(protect, postTimer);

module.exports = router;
