const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const config = require("config");
const db = config.get("mongoURI");
module.exports = () => {
  const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.MongoDB({db: db, leverl: 'info'})
    ]
  });
  logger.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  );

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  // winston.add(new winston.transports.File, { filename: 'logfile.log' });
  // winston.add(new winston.transports.MongoDB, { db: 'mongod://mongo:27017/molitvaapi', level: 'info' }); 
};

