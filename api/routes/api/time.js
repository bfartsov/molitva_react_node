const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../../models/Timer');
const Timer = mongoose.model('timer');
const auth = require("../../middleware/auth");



router.post('/edit',  async (req, res)=>{
    try {
        const timer = await Timer.findOne({name: 'timer'});
        
        if(!timer){
            const {date, time} = req.body;
            const newTimer = new Timer({
                date, time
            });
           const timer =  await newTimer.save();
            
           res.status(200).json(timer);
        }
        if(timer){
          
                timer.date = req.body.date;
                timer.time = req.body.time;

                
               const newTimer =  await timer.save();
               
                res.status(200).json(newTimer);

        }

    } catch (error) {
        console.log(error);
    }
});


router.get('/',async(req, res)=>{
    try {
        
        const timer = await Timer.findOne({name: 'timer'});
        if(!timer){
            return  res.status(400).json({
                msg: "No timer"
              });
        }
        res.status(200).json(timer);
    } catch (error) {
        console.log(error);
    }
    
}
);
module.exports = router;
