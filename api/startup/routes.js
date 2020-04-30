const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const error = require("../middleware/error");
module.exports = (app) => {
  app.disable("x-powered-by");
  app.use(helmet);
  app.use(express.json({ extended: true }));

  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "*",
    })
  );
  app.get("/", (req, res) => {
    res.json("app running");
  });

  app.use("/api/banners", require("../routes/api/banners"));
  app.use("/api/auth", require("../routes/api/auth"));
  app.use("/api/events", require("../routes/api/events"));
  app.use("/api/news", require("../routes/api/news"));
  app.use("/api/videos", require("../routes/api/videos"));
  app.use("/api/menus", require("../routes/api/menus"));
  app.use("/api/live", require("../routes/api/live"));
  app.use("/api/nationalprayers", require("../routes/api/nationalPrayers"));
  app.use("/api/timer", require("../routes/api/time"));
  app.use((req, res, next) => {
    const error = new Error("Item not found");
    error.status = 404;
    next(error);
  });
  app.use(error);
};
