const mongoose = require("mongoose");
const cuid = require("cuid");
const _ = require("lodash");

require("./models/Live");
require("./models/Timer");
require("./models/User");
const User = mongoose.model("user");
const Timer = mongoose.model("timer");
const Live = mongoose.model("live");
const models = { User, Timer, Live };
const config = require("config");

const url =
  config.get("mongoURI") || "mongodb://localhost:27017/molitvaapi-test";

global.newId = () => {
  return mongoose.Types.ObjectId();
};

const remove = (collection) =>
  new Promise((resolve, reject) => {
    collection.remove((err) => {
      if (err) return reject(err);
      resolve();
    });
  });

beforeEach(async (done) => {
  const db = cuid();
  function clearDB() {
    return Promise.all(
      _.map(mongoose.connection.collections, (c) => remove(c))
    );
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(url + db, {
        useNewUrlParser: true,
        autoIndex: true,
      });
      await clearDB();
      await Promise.all(Object.keys(models).map((name) => models[name].init()));
    } catch (e) {
      console.log("connection error");
      console.error(e);
      throw e;
    }
  } else {
    await clearDB();
  }
  done();
});
afterEach(async (done) => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  return done();
});
afterAll((done) => {
  return done();
});
