const joy = require("@hapi/joi");

module.exports = bannerValidationShema = joy.object({
  title: joy.string().required(),
  video: joy.string().required(),
  dateCreated: joy.string().required(),
});
