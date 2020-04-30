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
const { check } = require("express-validator");

// @route  GET api/events
// @desc   Get all events
// @access Public

router.get("/", getEvents);

// @route  GET api/events/id
// @desc   Get an event by id
// @access Public
// @route  GET api/events/number
// @desc   Get surgain number of events
// @access Public
router.get("/limit/:number", getEventsNumber);
router.get("/id/:id", getEvent);

// @route  POST api/events/
// @desc   Create new Event
// @access Private

router.post(
  "/",
  [
    protect,
    // check("title", "title is required").exists(),
    // check("date", "Date is required").exists(),
    // check("img", "Image is required").exists(),
    upload,
  ],
  addEvent
);

// @route  PUT api/events/
// @desc   Update an event
// @access Private

router.put(
  "/:id",
  [
    protect,
    // check("title", "title is required").exists(),
    // check("date", "Date is required").exists(),
    // check("img", "Image is required").exists(),
    upload,
  ],
  updateEvent
);

// @route  PUT api/events/
// @desc   Delete an Event
// @access Private
router.delete("/:id", protect, deleteEvent);

module.exports = router;
