const mongoose = require("mongoose");
// const User = require("../models/userSchema");

const PostSchema = new mongoose.Schema(
  {
    owner: { type: Object, required: true },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    // imgLink: {
    //   type: Array,
    // },
    photos: {
      type: Array,
    },
    maxGuests: {
      type: String,
      default: "",
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    checkIn: {
      type: String,
    },
    checkOut: {
      type: String,
    },
  },
  { timestamps: true }
);

//collection name
module.exports = mongoose.model("Post", PostSchema);
