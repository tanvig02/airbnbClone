const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

//collection name
module.exports = mongoose.model("User", UserSchema);
