const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  img: {},
  eventDate: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("banner", BannerSchema);
