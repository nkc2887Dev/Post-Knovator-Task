const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");

// Register User
const createPost = asyncHandler(async (req, res) => {
  // first find Post has already Created or not
  const title = req.body.title;
  const post = await Post.findOne({ title });
  if (!post) {
    // Create a New post
    req.body.CreatedBy = req.user._id;
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: "success",
      User: newPost,
    });
  } else {
    // Post already Exist
    throw new Error("Post Already Exist");
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const { CreatedBy } = req.body;
    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    if (post.CreatedBy !== CreatedBy) {
      throw new Error("You are not authorized to update this post");
    }
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      status: "success",
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get a All Post
const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const getPost = await Post.find();
    const activeCount = await Post.countDocuments({ is_active: true });
    const inactiveCount = await Post.countDocuments({ is_active: false });

    res.json({
      status: "success",
      activeCount,
      inactiveCount,
      Result: getPost.length,
      Post: getPost,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get a Single Post
const getPost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getPost = await Post.findById(id);
    res.json({
      status: "success",
      Post: getPost,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete a User
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const { CreatedBy } = req.body;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        status: "failure",
        message: "Post not found",
      });
    }
    if (post.CreatedBy !== CreatedBy) {
      throw new Error("You are not authorized to update this post");
    }
    const deletepost = await Post.findByIdAndDelete(id);
    if (!deletepost) {
      throw new Error("Post Already Deleted");
    }
    res.json({
      status: "success",
      message: "Post Deleted Successfully",
      post: deletepost,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const searchPosts = async (req, res) => {
  const { latitude, longitude } = req.query;
  
  try {
    const posts = await Post.find({
      location: {
          $geometry: {
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
      }
    });

    res.json({
      status: 'success',
      message: `Found ${posts.length} posts near (${latitude}, ${longitude})`,
      posts
    });
  } catch (error) {
    throw new Error(error);
  }
}


module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  searchPosts,
};
