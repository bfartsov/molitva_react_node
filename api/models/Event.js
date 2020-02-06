const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  place: {
    type: String
  },
  date: {
    type: String
  },
  sortingDate: {
    type: Date
  },
  startTime: {
    type: String
  },
  endTime: {

  },
  region: {
    type: String
  },
  city: {

  },
  description: {

  },
  img: {

  },
  image: {
    data: Buffer,
    type: String
  }
});

mongoose.model('event', EventSchema);
