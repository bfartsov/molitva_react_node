const express = require("express");
const winston = require("winston");
const path = require("path");

const conectedDB = require("./startup/db");

const app = express();
conectedDB();
const publicFolder = path.join(__dirname, "/public");
app.use("/public", express.static(publicFolder));
app.use(express.static(publicFolder));
require("./startup/logging")();
require("./startup/routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => winston.info(`Server running on ${PORT}`));
