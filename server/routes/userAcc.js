const express = require("express");
const app = express();

const cors = require("cors");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploads = multer({ storage: storage });

app.use(express.urlencoded({ extended: false }));

//controller function
const {
  userAccount,
  createPost,
  deletePost,
  updatePost,
} = require("../controller/postController");

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

//instance of a express Router -> router
const router = express.Router();

//get all posts of userAcc
router.get("/allpost/:id", userAccount);

//creat a net post
router.post("/create", createPost);

//delete a post
router.delete("/:id", deletePost);

//update a net post
router.patch("/upload/:id", updatePost);

module.exports = router;
