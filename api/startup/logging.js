const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const config = require("config");
const db = config.get("mongoURI");
module.exports = () => {
  const logger = winston.createLogger({
    level: "info",
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "combined.log" }),
      new winston.transports.MongoDB({ db: db, level: "error" }),
    ],
  });
  logger.exceptions.handle(
    new winston.transports.File({ filename: "exceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
