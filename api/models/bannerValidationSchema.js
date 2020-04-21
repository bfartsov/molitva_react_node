const joy = require("@hapi/joi");

module.exports = bannerValidationShema = joy.object({
  title: joy.string().required(),

  eventDate: joy.required(),
});
