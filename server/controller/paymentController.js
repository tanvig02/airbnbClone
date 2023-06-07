const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

const getkey = async (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
};

const payment = async (req, res) => {
  const { amount } = req.body;

  // res.status(200).json({ msg: "Payment" });
  try {
    console.log(amount);
    console.log("hii neha");
    //Razorpay Payment
    let instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });
    // console.log(instance, "instance");

    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    console.log(order, "order");
    res.status(200).json({ msg: "payment", order });
  } catch (error) {
    console.log(error);
  }
};

//verify payment
const verify = async (req, res) => {
  // console.log(req.body);
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  console.log("sig received ", razorpay_signature);
  console.log("sig generarted ", expectedSignature);

  if (expectedSignature === razorpay_signature) {
    res.redirect(
      `https://airbnbclone-production-699f.up.railway.app/bookPayment/confirm`
    );
  } else {
    res.redirect(
      `https://airbnbclone-production-699f.up.railway.app/bookPayment/Notconfirm`
    );
    res.status(400).json({ success: false });
  }
  // try {
  //   //Razorpay Payment

  //   res.status(200).json({ success: true });
  // } catch (error) {
  //   console.log(error);
  // }
};

module.exports = { payment, verify, getkey };
