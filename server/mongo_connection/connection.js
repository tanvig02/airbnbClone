//mongoose connection code
const mongoose = require("mongoose");

// const DB_URL = process.env.DB_URL;

//mongo compass/atlas connection
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(DB_URL)
//   .then(() => console.log("connection successfull"))
//   .catch((err) => {
//     console.log("connection failed");
//   });

const url = process.env.DB_URL;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
