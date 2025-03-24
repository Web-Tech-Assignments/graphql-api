const { GraphQLList } = require('graphql');
const BookType = require('../types/BookType');
const Book = require('../../models/Book');

const bookQueries = {
  books: {
    type: new GraphQLList(BookType),
    resolve() {
      return Book.find();
    }
  }
};

module.exports = bookQueries;
