const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  desciption: {
    type: String
  },
  img: {

  },
  video: {

  },
  date: {
    type: Number
  }
});

mongoose.model('video', VideoSchema);
