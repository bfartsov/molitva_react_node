const router = require("express").Router();
const { protect } = require("../../middleware/auth");
const upload = require("../../helpers/upload");
const {
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
  getEventsNumber,
} = require("../../controllers/eventsController");

router.route("/").get(getEvents).post(protect, upload, addEvent);
router.route("/limit/:number").get(getEventsNumber);
router.route("/id/:id").get(getEvent);
router.route("/:id").put(protect, updateEvent).delete(protect, deleteEvent);

module.exports = router;
