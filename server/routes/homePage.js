const express = require("express");
const cors = require("cors");
const app = express();
const Post = require("../models/postSchema");

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

//instance of a express Router -> router
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.status(200).json(posts);
});

module.exports = router;
