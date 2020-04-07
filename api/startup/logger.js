const winston = require("winston");
require("winston-mongodb");

const config = require("config");
const db = config.get("mongoURI");
module.exports = logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.MongoDB({ db: db, leverl: "info" }),
  ],
});
