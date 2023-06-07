const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require("./routes/user");
const userAccRoutes = require("./routes/userAcc");
const bookingRoute = require("./routes/bookingPage");
const homePage = require("./routes/homePage");
const paymentRoute = require("./routes/paymentPage");
// require("dotenv").config();
const dotenv = require("dotenv");

//middleware

app.use(bodyParser.json({ limit: "60mb" }));
app.use(bodyParser.urlencoded({ limit: "60mb", extended: true }));

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

//routes
app.use("/", homePage);

app.use("/user", userRoutes);

app.use("/userAcc", userAccRoutes);

app.use("/booking", bookingRoute);
app.use("/bookpayment", paymentRoute);

// app.use("/verify", paymentRoute);

// mongoose.connect(process.env.DB_URL).then(() => {
//   console.log("connected to db");
// });

mongoose.set("strictQuery", false);
dotenv.config();
const connectDB = require("./mongo_connection/connection");
connectDB();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("connected to port", process.env.PORT);
});
