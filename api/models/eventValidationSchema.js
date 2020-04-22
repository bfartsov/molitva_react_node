const joy = require("@hapi/joi");

module.exports = eventValidationSchema = joy.object({
  title: joy.string().required(),
  date: joy.string().required(),
});
