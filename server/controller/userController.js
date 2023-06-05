const express = require("express");
const cors = require("cors");
const app = express();
const userModel = require("../models/userSchema");
const Post = require("../models/postSchema");
const bcryptjs = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const { sign } = require("crypto");
require("dotenv").config();

const cloudinary = require("../utils/coludinary");
const { default: mongoose } = require("mongoose");

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

//jwt token (header+payload(userdata)+signature)
//JWT token is used to identify authorized users.

//jwt token will be used in both- register and login
//after register user will be directy redirected to home page
//is already registered then after login directed to home page

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//Register user
const registerUser = async (req, res) => {
  //validator

  const { userName, email, password, photo } = req.body;

  if ((!userName || !email || !password, !photo)) {
    return res.status(400).json({ msg: "Please Enter all the Fields" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ msg: "Email is not valid" });
  }

  try {
    const result = await cloudinary.uploader.upload(photo, {
      folder: "userPhoto",
      // width: 300,
      // crop: "scale",
    });
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "email already exist" });
    } else {
      //hasing the password
      const salt = await bcryptjs.genSalt(10);
      const hash = await bcryptjs.hash(password, salt);

      //creating new user
      const user = await userModel.create({
        userName,
        email,
        password: hash,
        photo: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });

      //token
      const token = createToken(user._id);

      if (user) {
        console.log(userName);
        return res
          .status(200)
          .json({ msg: "user registed successfully", user, token });
      } else {
        res.status(400).json({ msg: "User not found" });
      }
    }
  } catch (error) {
    // res.status(400).json({ msg: "ERROR" });
    console.log(error);
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res.status(400).json({ msg: "Fill all the details" });
  }

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Incorrect email" });
    }

    const userName = user.userName;
    const userPass = await bcryptjs.compare(password, user.password);
    if (!userPass) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    //create token
    const token = createToken(user._id);

    return res.status(200).json({ msg: "Successfully logedIn", user, token });
  } catch (error) {
    console.log(error);
  }
};

//update user Profile
const updateUser = async (req, res) => {
  const { userName, email, photo, userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "user not found" });
  }

  const userData = await userModel.findById(userId);

  const updateData = {
    userName,
    email,
  };

  //modify img conditionally
  if (photo !== "") {
    const ImgId = userData.photo.public_id;
    if (ImgId) {
      await cloudinary.uploader.destroy(ImgId);
    }

    var newPhoto = await cloudinary.uploader.upload(photo, {
      folder: "userPhoto",
    });

    updateData.photo = {
      public_id: newPhoto.public_id,
      url: newPhoto.url,
    };
  }

  const user = await userModel.findOneAndUpdate({ _id: userId }, updateData);

  await Post.updateMany(
    { ownerId: userId },
    {
      $set: {
        "owner._id": userId,
        "owner.userName": userName,
        "owner.email": email,
        "owner.photo": {
          public_id: newPhoto.public_id,
          url: newPhoto.url,
        },
        ownerId: userId,
      },
    },
    { new: true }
  );

  console.log("update done");

  if (!user) {
    return res.status(400).json({ error: "no such user" });
  }
  res.status(200).json(user);
};

//Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const userdata = await userModel.findById(id);
  const user = await userModel.findByIdAndDelete({ _id: id });
  console.log(userdata);

  //retrive photo id
  const photoId = userdata.photo.public_id;
  await cloudinary.uploader.destroy(photoId);

  const delPost = await Post.deleteMany({ ownerId: id });

  if (user && delPost) {
    res.status(200).json({ msg: "user deleted" });
  }
};

module.exports = { loginUser, registerUser, updateUser, deleteUser };
