const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  title: {
    type: String,
    require: true
},
description: {
    type: String
},
img: {

},
video: {

},
dateCreated:{
    
},
date: {
},
feature: [],

});

mongoose.model('video', VideoSchema);
