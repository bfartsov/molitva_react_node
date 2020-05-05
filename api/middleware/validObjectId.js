const mongoose = require("mongoose");
const ErrorResponse = require("../helpers/errorResponse");

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ErrorResponse("Invalid id", 404));
  }
  next();
};
