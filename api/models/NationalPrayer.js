const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NationalPrayerSchema = new Schema({
  year: { type: Number, require: true },
  video: String,
  title: { type: String, required: true },
  img: { type: String, required: true },
  text: { type: String, required: true },
});

mongoose.model("nationalprayer", NationalPrayerSchema);
