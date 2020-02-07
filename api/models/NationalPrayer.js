const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NationalPrayerSchema = new Schema({
  year: Number,
  video: String,
  title: { type: String, required: true },
  img: { type: String, required: true },
  text: { type: String, required: true }
});

mongoose.model("nationalprayer", NationalPrayerSchema);
