const url = require('url');
module.exports = function fullUrl (req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host')
  });
};
