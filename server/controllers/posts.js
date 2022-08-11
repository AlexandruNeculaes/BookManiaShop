import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

const router = express.Router();

//function to get all the posts
export const getPosts = async (req, res) => {
  //getting the page from req
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await PostMessage.countDocuments({});
    //finding the posts from database
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    //sending the posts and current page and number of pages as a response
    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    //sending 404 status and error message if something goes wrong
    res.status(404).json({ message: error.message });
  }
};

//function to get posts by search
export const getPostsBySearch = async (req, res) => {
  //extracting the data from request
  const { searchQuery, tags } = req.query;

  //finding the posts by the seacrh data
  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    //sending the posts as response
    res.json({ data: posts });
  } catch (error) {
    //sending 404 status and error message if something goes wrong
    res.status(404).json({ message: error.message });
  }
};

//funtion to get a post by it id
export const getPost = async (req, res) => {
  //extracting id from request parameters
  const { id } = req.params;

  try {
    //finding the post by id
    const post = await PostMessage.findById(id);

    //sending the post as response
    res.status(200).json(post);
  } catch (error) {
    //sending 404 status and error message if something goes wrong
    res.status(404).json({ message: error.message });
  }
};

//function to create a new post and save in the database
export const createPost = async (req, res) => {
  //extracting post data from request body
  const post = req.body;

  //creating a new post by using post Message model
  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    //saving the post to database
    await newPostMessage.save();

    //sending the created post as a response
    res.status(201).json(newPostMessage);
  } catch (error) {
    //sending 404 status and error message if something goes wrong
    res.status(409).json({ message: error.message });
  }
};

//function to update the exisiting post
export const updatePost = async (req, res) => {
  //extracting the post data from request
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  //finding by id and updating the post
  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

//function to delete the existing post
export const deletePost = async (req, res) => {
  //extracting the id from request
  const { id } = req.params;

  //checking if id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  //finding the post by id and deleting it
  await PostMessage.findByIdAndRemove(id);

  //sending a response message
  res.json({ message: "Post deleted successfully." });
};

//function to like a post
export const likePost = async (req, res) => {
  //extracting id form request parameters
  const { id } = req.params;

  //checing if req don't contains a user id, sending unauthenticated message
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  //finding the post by id
  const post = await PostMessage.findById(id);

  //adding the like to the post
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

//function to add a comment to a post
export const commentPost = async (req, res) => {
  //extracting data from req
  const { id } = req.params;
  const { value } = req.body;

  //finding post by id
  const post = await PostMessage.findById(id);

  //pushing the new comment to the comments of post
  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export default router;
