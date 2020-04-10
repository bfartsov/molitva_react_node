const mongoose = require("mongoose");
const path = require("path");
const fullUrl = require("../helpers/fullUrl");
const resizeImg = require("../helpers/resize");
require("../models/Event");
const Events = mongoose.model("event");
const { validationResult } = require("express-validator");
// get all events
const getEvents = async (req, res, next) => {
  try {
    const events = await Events.find();
    if (events.length === 0) {
      return res.status(400).json({
        error: [
          {
            msg: "Event not found",
          },
        ],
      });
    }
    res.status(200).json(events);
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
};
// get surternumbe of events
const getEventsNumber = async (req, res, next) => {
  try {
    const events = await Events.find().limit(+req.params.number);
    if (events.length === 0) {
      return res.status(400).json({
        error: [
          {
            msg: "Event not found",
          },
        ],
      });
    }

    res.status(200).json(events);
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
};

// get event by ID
const getEvent = async (req, res, next) => {
  try {
    const event = await Events.findById(req.params.id);
    if (!event) {
      return res.status(400).json({
        error: [
          {
            msg: "Event not found",
          },
        ],
      });
    }
    res.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
};

// Add an Event
const addEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const {
      title,
      date,
      place,
      startTime,
      endTime,
      region,
      city,
      description,
    } = req.body;
    const url = fullUrl(req);
    const resizedImage = await resizeImg(req.file, 263, 320);
    const eventImg = `${url}/${resizedImage.options.fileOut}`;

    const newEvent = {
      title,
      date,
      img: eventImg,
      place,
      startTime,
      endTime,
      region,
      city,
      description,
    };
    const event = new Events(newEvent);
    const saveEvent = await event.save();
    res.status(200).json(saveEvent);
  } catch (error) {
    console.log(error);
  }
};
// Update an Event by ID
const updateEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const url = fullUrl(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    const resizedImage = await resizeImg(req.file, 263, 320);
    const eventImg = `${url}/${resizedImage.options.fileOut}`;

    const {
      title,
      date,
      place,
      startTime,
      endTime,
      region,
      city,
      description,
    } = req.body;
    const event = await Events.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        errors: [
          {
            msg: "Event not found",
          },
        ],
      });
    }
    event.title = title;
    event.date = date;
    event.img = eventImg;
    event.place = place;
    event.startTime = startTime;
    event.endTime = endTime;
    event.region = region;
    event.city = city;
    event.description = description;
    const updatedEvent = await event.save();
    return res.status(200).json(updatedEvent);
  } catch (error) {
    return res.status(400).json({
      errors: error.array(),
    });
  }
};
// delete Event
const deleteEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    const event = await Events.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        errors: [
          {
            msg: "Event not found",
          },
        ],
      });
    }
    const deleteEvent = await event.deleteOne();
    return res.status(200).json(deleteEvent);
  } catch (errors) {
    return res.status(400).json({
      errors: errors,
    });
  }
};
module.exports = {
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
  getEventsNumber,
};
