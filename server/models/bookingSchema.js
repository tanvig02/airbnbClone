const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  place: {
    type: Object,
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: Number,
  numberOfGuests: { type: Number, default: 1 },
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
