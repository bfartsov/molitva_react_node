const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  img: {

  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('banner', BannerSchema);
