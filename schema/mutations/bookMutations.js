const { GraphQLString } = require('graphql');
const BookType = require('../types/BookType');
const Book = require('../../models/Book');
const Author = require('../../models/Author');

const bookMutations = {
  addBook: {
    type: BookType,
    args: { bookId: { type: GraphQLString }, title: { type: GraphQLString }, authorId: { type: GraphQLString } },
    async resolve(_, args) {
      if (!/^B([0-9]|[12][0-9]|30)$/.test(args.bookId)) {
        throw new Error("Invalid Book ID! Must be between B0 and B30.");
      }
      const authorExists = await Author.findOne({ authorId: args.authorId });
      if (!authorExists) throw new Error("Author ID does not exist!");
      return new Book(args).save();
    }
  },
  deleteBook: {
    type: GraphQLString,
    args: { bookId: { type: GraphQLString } },
    async resolve(_, { bookId }) {
      const book = await Book.findOne({ bookId });
      if (!book) return "Book not found!";
      await Book.deleteOne({ bookId });
      return "Book deleted successfully!";
    }
  },
  updateBook: {
        type: BookType,
        args: { bookId: { type: GraphQLString }, title: { type: GraphQLString } },
        async resolve(_, { bookId, title }) {
          const updatedBook = await Book.findOneAndUpdate({ bookId }, { title }, { new: true });
          if (!updatedBook) throw new Error("Book not found!");
          return updatedBook;
        }
      }
};

module.exports = bookMutations;
