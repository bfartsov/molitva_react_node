const { clearHash } = require("../helpers/cache");

module.exports = (hash) => async (req, res, next) => {
  await next();
  clearHash(hash);
};
