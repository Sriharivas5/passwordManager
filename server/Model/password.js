const mongoose = require("mongoose");
const passwordsSchema = mongoose.Schema({
  userId: { type: String },
  website: { type: String },
  username: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("passwords", passwordsSchema);
