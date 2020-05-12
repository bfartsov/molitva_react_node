const express = require("express");
const logger = require("./startup/logger");
const path = require("path");

const conectedDB = require("./startup/db");

const app = express();
conectedDB();
const publicFolder = path.join(__dirname, "/public");
app.use("/public", express.static(publicFolder));
app.use(express.static(publicFolder));
require("./startup/logging")();
require("./startup/routes")(app);
require("./helpers/cache");

const start = async () => {
  try {
    conectedDB();

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => logger.info(`Server running on ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

module.exports = { app, start };
