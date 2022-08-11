import express from "express";

import {
  getPosts,
  getPostsBySearch,
  getPost,
  createPost,
  updatePost,
  likePost,
  commentPost,
  deletePost,
} from "../controllers/posts.js";

const router = express.Router();
import auth from "../middleware/auth.js";

//route for getting posts (By search, allposts, and by Id)
router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);

//auth is there to only allow the authenticated user to access them

//routes for adding new post, updating exisitng post, and deleting existing post
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

//routes for liking and adding comments for an individual post
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
