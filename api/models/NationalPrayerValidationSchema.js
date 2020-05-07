const joy = require("@hapi/joi");

module.exports = bannerValidationShema = joy.object({
  title: joy.string().required(),
  text: joy.string().required(),
  year: joy.number().required(),
});
