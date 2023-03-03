const express = require("express");
const route = express.Router();
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  searchPosts,
} = require("../controller/postController");
const { authMiddleware } = require("../middleware/authMiddleware");

route.post("/", authMiddleware, createPost);
route.get("/", authMiddleware, getAllPosts);
route.get("/:id", authMiddleware, getPost);
route.put("/:id", authMiddleware, updatePost);
route.delete("/:id", authMiddleware, deletePost);
route.post("/find", authMiddleware, searchPosts);

module.exports = route;
