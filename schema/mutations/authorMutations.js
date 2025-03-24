const { GraphQLString } = require('graphql');
const AuthorType = require('../types/AuthorType');
const Author = require('../../models/Author');
const Book = require('../../models/Book');

const authorMutations = {
  addAuthor: {
    type: AuthorType,
    args: { authorId: { type: GraphQLString }, name: { type: GraphQLString } },
    resolve(_, args) {
      if (!/^A([0-9]|[12][0-9]|30)$/.test(args.authorId)) {
        throw new Error("Invalid Author ID! Must be between A0 and A30.");
      }
      return new Author(args).save();
    }
  },
  deleteAuthor: {
    type: GraphQLString,
    args: { authorId: { type: GraphQLString } },
    async resolve(_, { authorId }) {
      const author = await Author.findOne({ authorId });
      if (!author) return "Author not found!";
      await Book.deleteMany({ authorId });
      await Author.deleteOne({ authorId });
      return "Author and associated books deleted successfully!";
    }
  },
  updateAuthor: {
        type: AuthorType,
        args: { authorId: { type: GraphQLString }, name: { type: GraphQLString } },
        async resolve(_, { authorId, name }) {
          const updatedAuthor = await Author.findOneAndUpdate({ authorId }, { name }, { new: true });
          if (!updatedAuthor) throw new Error("Author not found!");
          return updatedAuthor;
        }
      }
};

module.exports = authorMutations;
