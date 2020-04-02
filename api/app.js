const express = require("express");
const winston = require('winston');
const conectedDB = require("./startup/db");

const app = express();
conectedDB();
require('./startup/logging')();
require('./startup/routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => winston.info(`Server running on ${PORT}`));
