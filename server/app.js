const express = require("express");
const logger = require("./logger");
const app = express();

const PORT = 3000;

const posts = [
  { id: 1, title: "Post 1", content: "This is post content 1." },
  { id: 2, title: "Post 2", content: "This is post content 2." },
];

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.json({ message: "Post created successfully!" });
});

app.get("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((post) => post.id === postId);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

app.put("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const updatedPost = req.body;
  const existingPostIndex = posts.findIndex((post) => post.id === postId);
  if (existingPostIndex !== -1) {
    posts[existingPostIndex] = updatedPost;
    res.json({ message: "Post updated successfully!" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

app.delete("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const existingPostIndex = posts.findIndex((post) => post.id === postId);
  if (existingPostIndex !== -1) {
    posts.splice(existingPostIndex, 1);
    res.json({ message: "Post deleted successfully!" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

app.use(logger);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
