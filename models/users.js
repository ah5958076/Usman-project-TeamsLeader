const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  emailAddress: {type: String, required: true, unique: true},
  password: {type: String, required: false},
  fullName: {type: String, required: true},
  accountName: {type: String, required: true},
  isEmailVerified: {type: Boolean, require: false, default: false},
  emailVerificationSessionID: {type: Number, required: false, unique: true}
}, {timestamps: true});


module.exports = mongoose.model("User", userSchema);