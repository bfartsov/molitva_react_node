const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimerSchema = new Schema({
    date: {
        type: String,
       
    },
    time: {
        type: String,
       
    },
    name:{type: String,
        default: 'timer'
    }
   
});

mongoose.model('timer', TimerSchema);
