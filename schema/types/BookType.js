const { GraphQLObjectType, GraphQLString } = require('graphql');
const Author = require('../../models/Author');

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => {
    const AuthorType = require('./AuthorType'); // Import inside the function
    return {
      bookId: { type: GraphQLString },
      title: { type: GraphQLString },
      author: {
        type: AuthorType,
        resolve(parent) {
          return Author.findOne({ authorId: parent.authorId });
        }
      }
    };
  }
});

module.exports = BookType;
