import express from "express";

import {
  getBooks,
  getBooksBySearch,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/books.js";

const router = express.Router();
import auth from "../middleware/auth.js";

//route for getting books (By search, allBooks, and by Id)
router.get("/search", getBooksBySearch);
router.get("/", getBooks);
router.get("/:id", getBook);

//routes for adding new book, updating exisitng book, and deleting existing book
//auth is there to only allow the authenticated user to access them
router.post("/", auth, createBook);
router.patch("/:id", auth, updateBook);
router.delete("/:id", auth, deleteBook);

export default router;
