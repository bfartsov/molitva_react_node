const router = require('express').Router();
const mongoose = require('mongoose');
require('../../models/Live');
const Live = mongoose.model('live');
const {
  check,
  validationResult
} = require('express-validator');

// @route  GET api/live
// @desc   get live details
// @access Public

router.get('/', async (rq, res) => {
  try {
    const live = await Live.find();
    if (live.length <= 0) {
      return res.status(400).json({
        msg: 'No information found'
      });
    };
    res.status(200).json(live);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        msg: 'Server Error'
      }
    });
  };
});
// @route  Post api/live
// @desc   get live details
// @access Public

router.post('/edit', [check('url', 'Url is required').exists(), check('type', 'Type is required').exists()], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };
    const live = await Live.find();
    // if live does not exist create it
    if (live.length <= 0) {
      const {
        url,
        type
      } = req.body;
      const newLive = new Live({
        url,
        type
      });
      const savedLive = await newLive.save();
      return res.status(200).json(savedLive);
    };

    // if live exist update it
    if (live) {
      const live = await Live.findOne({
        name: 'live'
      });
      live.url = req.body.url;
      live.type = req.body.type;
      const updatedLive = await live.save();
      return res.status(200).json(updatedLive);
    };
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        msg: 'Server Error'
      }
    });
  };
});

module.exports = router;
