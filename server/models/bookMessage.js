import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  message: String,
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
