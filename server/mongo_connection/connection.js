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

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
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
