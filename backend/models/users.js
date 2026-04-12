const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
