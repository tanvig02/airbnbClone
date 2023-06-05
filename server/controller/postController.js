const express = require("express");
const cors = require("cors");
const app = express();
const Post = require("../models/postSchema");
const User = require("../models/userSchema");
const mongoose = require("mongoose");
const cloudinary = require("../utils/coludinary");
const { resolve } = require("path");

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

//get all posts of user
const userAccount = async (req, res) => {
  const { id } = req.params;

  // const ownerId = Post.owner._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such id" });
  }
  const posts = await Post.find({ ownerId: id }).sort({ createdAt: -1 });

  if (!posts) {
    return res.status(400).json({ error: "no such post" });
  }

  res.status(200).json(posts);
};

//get a single post-- in booking routes
// const getPost = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "no such post" });
//   }

//   const post = await Post.findById(id);

//   if (!post) {
//     return res.status(400).json({ error: "no such post" });
//   }
//   res.status(200).json(post);
// };

const uploadBase64ImageToCloudinary = async (image) => {
  //url
  // const result = await cloudinary.uploader.upload(image, {
  //   folder: "PlacePhoto",
  // });
  // console.log(result), 12;
  // const res = { public_id: result.public_id, url: result.url };
  // console.log(res);
  // return res;
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: "PlacePhoto",
    };

    cloudinary.uploader.upload(image, uploadOptions, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({ public_id: result.public_id, url: result.url });
      }
    });
  });
};

const uploadMultipleBase64ImagesToCloudinary = async (base64Images) => {
  const cloudinaryUrls = [];

  const uploadPromises = base64Images.map((base64Image) => {
    return uploadBase64ImageToCloudinary(base64Image)
      .then((cloudinaryUrl) => cloudinaryUrls.push(cloudinaryUrl))
      .catch((error) =>
        console.error("Error uploading image to Cloudinary:", error)
      );
  });

  await Promise.all(uploadPromises);

  return cloudinaryUrls;
};

//create new post
const createPost = async (req, res) => {
  console.log("Add Post");
  const {
    title,
    address,
    description,
    checkIn,
    checkOut,
    price,
    userId,
    addedPhotos,
    maxGuest,
  } = req.body;
  // const userId = req.body.userId;

  // const result = await cloudinary.uploader.upload(photo, {
  //   folder: "PlacePhoto",
  //   // width: 300,
  //   // crop: "scale",
  // });

  try {
    const ownerData = await User.findById(userId);
    console.log(userId);

    const cloudinaryUrls = await uploadMultipleBase64ImagesToCloudinary(
      addedPhotos
    );

    const savePost = await Post({
      owner: ownerData,
      ownerId: userId,
      title,
      address,
      description,
      checkIn,
      checkOut,
      price,
      // photo: cldPhoto,
      photos: cloudinaryUrls,
      maxGuest,
    });

    const post = await savePost.save();
    console.log(title);
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "post not saved ", e });
  }
};

//delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such id" });
  }

  const postdata = await Post.findById(id);
  const post = await Post.findOneAndDelete({ _id: id });

  //retrive photo id
  const photos = postdata.photos; //array
  photos.map(async (img) => {
    await cloudinary.uploader.destroy(img.public_id);
  });

  if (!post) {
    return res.status(400).json({ error: "no such post" });
  }
  res.status(200).json(post);
};

//update a post
const updatePost = async (req, res) => {
  const { id } = req.params;
  console.log("update");

  const {
    ownerData,
    title,
    address,
    description,
    checkIn,
    checkOut,
    price,
    userId,
    addedPhotos,
  } = req.body;

  const arrayPhoto = [];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such post" });
  }
  const postdata = await Post.findById(id);

  //modify img conditionally
  const cloud = [];
  for (var i = 0; i < addedPhotos.length; i++) {
    if (typeof addedPhotos[i] == "string") {
      cloud.push(addedPhotos[i]);
      var index = i;
    }
  }
  addedPhotos.splice(cloud.length + 1);
  console.log(addedPhotos);

  for (var j = 0; j < cloud.length; j++) {
    const newPhoto = await cloudinary.uploader.upload(cloud[j], {
      folder: "PlacePhoto",
    });
    addedPhotos.push({
      public_id: newPhoto.public_id,
      url: newPhoto.url,
    });
  }

  console.log(addedPhotos);
  const updateData = {
    owner: ownerData,
    ownerId: userId,
    title,
    address,
    description,
    checkIn,
    checkOut,
    price,
    photos: addedPhotos,
  };

  // const post = await Post.findOneAndUpdate({ _id: id }, { ...req.body });
  const post = await Post.findOneAndUpdate({ _id: id }, updateData);

  console.log("update done");

  if (!post) {
    return res.status(400).json({ error: "no such post" });
  }
  res.status(200).json(post);
};

module.exports = {
  userAccount,
  createPost,
  deletePost,
  updatePost,
};
