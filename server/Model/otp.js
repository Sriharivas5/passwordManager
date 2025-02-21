const mongoose = require("mongoose");
const otpSchema = mongoose.Schema({
  id: String,
  otp: Number,
  email: String,
  date: Date,
});
module.exports = mongoose.model("otp", otpSchema);
