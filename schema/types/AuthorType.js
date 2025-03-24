const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const Book = require('../../models/Book');

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => {
    const BookType = require('./BookType'); // Import inside the function to avoid circular dependency
    return {
      authorId: { type: GraphQLString },
      name: { type: GraphQLString },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent) {
          return Book.find({ authorId: parent.authorId });
        }
      }
    };
  }
});

module.exports = AuthorType;
