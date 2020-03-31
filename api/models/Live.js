const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const liveSchema = new Schema({
  name: {
    type: String,
    default: 'live'
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
  },
  player: {
    type: String,

  },
  text: {
    type: String
  }

});
mongoose.model('live', liveSchema);
