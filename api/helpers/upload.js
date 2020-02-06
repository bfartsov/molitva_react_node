const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  // destination: './public/img',
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

function checkFileType (file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    // eslint-disable-next-line standard/no-callback-literal
    cb('Only images are allowed');
  }
}

const upload = multer({
  storage: storage
}).single('img');

module.exports = upload;
