const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: { type: Number, required: true },
  name: { type: String, required: true },
  authorName: { type: String, required: true },
  description: { type: String, required: true },
  bookImage: { type: String, required: true },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;