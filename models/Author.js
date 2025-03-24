const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  authorId: { type: String, required: true, unique: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model('Author', AuthorSchema);
