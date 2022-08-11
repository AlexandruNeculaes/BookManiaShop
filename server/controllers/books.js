import express from "express";
import mongoose from "mongoose";

import BookMessage from "../models/bookMessage.js";

const router = express.Router();

//function to get the books
export const getBooks = async (req, res) => {
  //getting the page from req
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await BookMessage.countDocuments({});
    //finding the books from database
    const books = await BookMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    //sending the books and current page and number of pages as a response
    res.json({
      data: books,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    //sending 404 status and error message if something goes wrong
    res.status(404).json({ message: error.message });
  }
};

//function to get books by search
export const getBooksBySearch = async (req, res) => {
  //extracting the data from request
  const { searchQuery, tags } = req.query;

  //finding the books by the seacrh data
  try {
    const title = new RegExp(searchQuery, "i");

    const books = await BookMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    //sending the books as response
    res.json({ data: books });
  } catch (error) {
    //sending 404 status and error message if something goes wrong
    res.status(404).json({ message: error.message });
  }
};

//funtion to get a book by it id
export const getBook = async (req, res) => {
  //extracting id from request parameters
  const { id } = req.params;

  try {
    //finding the book by id
    const book = await BookMessage.findById(id);

    //sending the book as response
    res.status(200).json(book);
  } catch (error) {
    //sending 404 status and error message if something goes wrong
    res.status(404).json({ message: error.message });
  }
};

//function to create a new book and save in the database
export const createBook = async (req, res) => {
  //extracting book data from request body
  const book = req.body;

  //creating a new book by using Book Message model
  const newBookMessage = new BookMessage({
    ...book,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    //saving the book to database
    await newBookMessage.save();

    //sending the created book as a response
    res.status(201).json(newBookMessage);
  } catch (error) {
    //sending 404 status and error message if something goes wrong
    res.status(409).json({ message: error.message });
  }
};

//function to update the exisiting book
export const updateBook = async (req, res) => {
  //extracting the book data from request
  const { id } = req.params;
  const {
    title,
    author,
    year,
    publisher,
    message,
    creator,
    price,
    selectedFile,
    tags,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No book with id: ${id}`);

  const updatedBook = {
    title,
    author,
    year,
    publisher,
    message,
    creator,
    price,
    selectedFile,
    tags,
    _id: id,
  };

  //finding by id and updating the book
  await BookMessage.findByIdAndUpdate(id, updatedBook, { new: true });

  res.json(updatedBook);
};

//function to delete the existing book
export const deleteBook = async (req, res) => {
  //extracting the id from request
  const { id } = req.params;

  //checking if id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No book with id: ${id}`);

  //finding the book by id and deleting it
  await BookMessage.findByIdAndRemove(id);

  //sending a response message
  res.json({ message: "Book deleted successfully." });
};

export default router;
