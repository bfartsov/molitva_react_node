const mongoose = require("mongoose");
const fullUrl = require("../helpers/fullUrl");
const resizeImg = require("../helpers/resize");
require("../models/Event");
const Events = mongoose.model("event");
const ErrorResponse = require("../helpers/errorResponse");
const eventValidationSchema = require("../models/eventValidationSchema");
const config = require("config");
// get all events
const getEvents = async (req, res, next) => {
  try {
    const events = await Events.find();
    if (events.length <= 0) {
      return next(new ErrorResponse("No events found", 404));
    }
    const CDN = config.get("CDN");
    events.forEach((event) => (event.img = CDN + "/" + event.img));
    res.status(200).json(events);
  } catch (error) {
    console.log(error.message);
    next(new ErrorResponse(error.message, error.status));
  }
};
// get surternumbe of events
const getEventsNumber = async (req, res, next) => {
  try {
    const events = await Events.find()
      .sort({ date: -1 })
      .limit(+req.params.number);
    if (events.length <= 0) {
      return next(new ErrorResponse("No events found", 400));
    }
    const CDN = config.get("CDN");
    events.forEach((event) => (event.img = CDN + "/" + event.img));
    res.status(200).json(events);
  } catch (error) {
    console.log(error.message);
    next(new ErrorResponse(error.message, error.status));
  }
};

// get event by ID
const getEvent = async (req, res, next) => {
  try {
    const event = await Events.findById(req.params.id);
    if (!event) {
      return next(new ErrorResponse("No event found", 404));
    }
    const CDN = config.get("CDN");
    event.img = CDN + "/" + event.img;
    res.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    next(new ErrorResponse(error.message, error.status));
  }
};

// Add an Event
const addEvent = async (req, res, next) => {
  try {
    const { error } = eventValidationSchema.validate(req.body, {
      allowUnknown: true,
    });

    const {
      title,
      date,
      location,
      startTime,
      endTime,
      region,
      city,
      description,
    } = req.body;
    if (error) {
      console.log(error);
      return next(new ErrorResponse(error.message, 400));
    }
    if (!req.file) {
      return next(new ErrorResponse("Image is required", 400));
    }
    const url = fullUrl(req);
    const resizedImage = await resizeImg(req.file, 263, 320);
    const eventImg = `${url}/${resizedImage.options.fileOut}`;

    const newEvent = {
      title,
      date,
      img: eventImg,
      location,
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
    next(new ErrorResponse(error.message, error.status));
  }
};
// Update an Event by ID
const updateEvent = async (req, res, next) => {
  try {
    const { error } = eventValidationSchema.validate(req.body, {
      allowUnknown: true,
    });

    const {
      title,
      date,
      location,
      startTime,
      endTime,
      region,
      city,
      description,
    } = req.body;
    if (error) {
      console.log(error);
      return next(new ErrorResponse(error.message, 400));
    }

    const event = await Events.findById(req.params.id);
    if (!event) {
      return next(new ErrorResponse("No events found", 400));
    }
    if (req.file) {
      const resizedImage = await resizeImg(req.file, 263, 320);
      const eventImg = `${url}/${resizedImage.options.fileOut}`;
      event.img = eventImg;
    }
    event.title = title;
    event.date = date;
    event.location = location;
    event.startTime = startTime;
    event.endTime = endTime;
    event.region = region;
    event.city = city;
    event.description = description;
    const updatedEvent = await event.save();
    return res.status(200).json(updatedEvent);
  } catch (error) {
    next(new ErrorResponse(error.message, error.status));
  }
};
// delete Event
const deleteEvent = async (req, res, next) => {
  try {
    const event = await Events.findById(req.params.id);
    if (!event) {
      return next(new ErrorResponse("No event found", 400));
    }
    await event.deleteOne();
    return res.status(200).json({
      msg: "Item deleted",
    });
  } catch (errors) {
    next(new ErrorResponse(error.message, error.status));
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
