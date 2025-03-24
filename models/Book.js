const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  authorId: { type: String, required: true, ref: 'Author' }
});

module.exports = mongoose.model('Book', BookSchema);
