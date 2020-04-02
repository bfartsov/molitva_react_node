const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const config = require("config");
const db = config.get("mongoURI");
module.exports = ()=> {
  winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  
  winston.add(winston.transports.File, { filename: 'logfile.log' });
  winston.add(winston.transports.MongoDB, { 
    db: db,
    level: 'info'
  });  
};