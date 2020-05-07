const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    next(error);
  }
});

userSchema.methods.checkPassword = function(password) {
  return new Promise(async (resolve, reject) => {
    const isMatch = await bcrypt.compare(password, this.password);
    if (!isMatch) {
      return reject("invalid credensial");
    }
    resolve(isMatch);
  });
};
mongoose.model("user", userSchema);
