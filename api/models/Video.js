const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  img: { require: true, type: String },
  video: { type: String, require: true },
  dateCreated: {},
  date: {},
  feature: { type: Array, require: true },
});

mongoose.model("video", VideoSchema);
