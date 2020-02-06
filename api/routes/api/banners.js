const router = require('express').Router();
const upload = require('../../helpers/upload');
const auth = require('../../middleware/auth');
require('../../models/Banner');
const { getBanners, getBanner, addBanner, editBanner, deleteBanner } = require('../../controllers/bannersController');
const {
  check
} = require('express-validator');

// @route  GET api/banners
// @desc   get All banners
// @access Public
router.get('/', getBanners);

// @route  GET api/banners/:id
// @desc   get Banner by Id
// @access Public

router.get('/:id', getBanner);

// @route  POST api/banners
// @desc   Create a Banner
// @access Private
router.post('/', [auth,
  check('title', 'Please enter title').exists(),
  check('img', 'please add a banner').exists(),
  upload
], addBanner);

// @route  PUT api/banners/:id
// @desc   Edit banner by ID
// @access Private

router.put('/:id', [auth,
  check('title', 'Please enter title').exists(),
  check('img', 'please add a banner').exists(),
  upload
], editBanner);

// @route  delete api/banners/:id
// @desc   Delete banner
// @access Private

router.delete('/:id', auth, deleteBanner);

module.exports = router;
