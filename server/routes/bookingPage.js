const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Booking = require("../models/bookingSchema");
const Post = require("../models/postSchema");
const userModel = require("../models/userSchema");

const { default: axios } = require("axios");

const { sendMail } = require("../controller/mailController");

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

//instance of a express Router -> router
const router = express.Router();

//get single post
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such post" });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(400).json({ error: "no such post" });
  }
  res.status(200).json(post);
});

//get all the bookings of user
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such id" });
  }
  const userBooking = await Booking.find({ userId: id }).sort({
    createdAt: -1,
  });

  // console.log(userBooking);

  // const post = await Post.findById(placeId).sort({
  //   createdAt: -1,
  // });

  if (!userBooking) {
    return res.status(400).json({ error: "no such booking" });
  }
  // if (!post) {
  //   return res.status(400).json({ error: "no such post" });
  // }

  res.status(200).json(userBooking);
});

//book the place
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const { customerId, name, phone, checkIn, checkOut, numberOfGuests, price } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such post" });
  }

  const post = await Post.findById(id);

  const placeDetails = {
    owner: post.owner.email,
    title: post.title,
    adderss: post.address,
    photos: post.photos,
  };
  // console.log(placeDetails, 12);

  try {
    const userId = await userModel.findById(customerId);
    // console.log(userId, 13);

    if (userId) {
      const bookPlace = await Booking.create({
        place: placeDetails,
        userId,
        checkIn,
        checkOut,
        name,
        phone,
        price,
        numberOfGuests,
      });

      const data = {
        userEmail: userId.email,
        place: bookPlace.place.title,
        checkin: bookPlace.checkIn,
        checkout: bookPlace.checkOut,
        price: bookPlace.price,
      };

      console.log("sending mail");

      //SENDING MAIL
      await axios
        .post("http://localhost:8000/booking/confirm")
        .then((res) => {
          console.log(
            "[bookingController : placeBooked] after making axios post request to MAILER!",
            data
          );
        })
        .catch(function (error) {
          console.log(
            "[bookingController : placeBooked] error after making axios post request to MAILER",
            error
          );
        });

      res.status(200).json(bookPlace);
    } else {
      res.status(400).json({ msg: "user do not exits or slot not available" });
    }
  } catch (error) {
    // res.status(400).json({ msg: "ERROR" });
    console.log(error);
  }
});

//sending email to user at confirm page
router.post("/confirm", sendMail);

module.exports = router;
