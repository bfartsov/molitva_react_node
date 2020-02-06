const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const liveSchema = new Schema({
  url: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  name: {
    type: String,
    default: 'live'
  }
});
mongoose.model('live', liveSchema);
