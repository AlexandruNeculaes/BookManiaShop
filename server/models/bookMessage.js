import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  publisher: String,
  message: String,
  price: Number,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var BookMessage = mongoose.model("BookMessage", bookSchema);

export default BookMessage;
