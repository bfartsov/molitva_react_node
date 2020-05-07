const joy = require("@hapi/joi");

module.exports = bannerValidationShema = joy.object({
  name: joy.string().required(),

  order: joy.number().required(),
  subMenu: joy.array(),
});
