const sharp = require('sharp');

const resizeImg = async (img, width, height) => {
  const resizedImage = await sharp(img.path)
    .resize(width, height, {
      kernel: sharp.kernel.mitchell,
      fit: sharp.fit.cover,
      position: sharp.strategy.entropy
    })
    .toFile('public/img/resized_' + width + 'x' + height + 'x' + Date.now() + '_' + img.originalname, (error) => {
      if (!error) {
        console.log('image resized');
      } else {
        console.log(error);
      };
    });
  return resizedImage;
};

module.exports = resizeImg;
