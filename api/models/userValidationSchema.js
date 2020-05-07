const joy = require("@hapi/joi");

module.exports = bannerValidationShema = joy.object({
  name: joy
    .string()
    .required()
    .trim(),
  email: joy
    .string()
    .required()
    .trim(),
  username: joy
    .string()
    .required()
    .trim(),
  password: joy.string().required(),
});
