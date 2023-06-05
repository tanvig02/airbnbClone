const express = require("express");
const cors = require("cors");
const app = express();
const User = require("../models/userSchema");

//controller function
const {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

//instance of a express Router -> router
const router = express.Router();

router.get("/acc", async (req, res) => {
  const user = await User.find();
  res.json(user);
});

//Register
router.post("/register", registerUser);

// //Login
router.post("/login", loginUser);

// Update User
router.patch("/update", updateUser);

//Delete Account
router.delete("/delete/:id", deleteUser);

module.exports = router;
