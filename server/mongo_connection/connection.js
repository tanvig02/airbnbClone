//mongoose connection code
const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

//mongo compass/atlas connection
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URL)
  .then(() => console.log("connection successfull"))
  .catch((err) => {
    console.log("connection failed");
  });
