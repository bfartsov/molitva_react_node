const joy = require("@hapi/joi");

module.exports = bannerValidationShema = joy.object({
  url: joy.string().required(),
});
