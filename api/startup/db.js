const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const logger = require("./logger");

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDb connected");
  } catch (error) {
    logger.error(error.message);

    // exit p process with failed
    process.exit(1);
  }
};

module.exports = connectDb;
