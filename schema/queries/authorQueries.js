const { GraphQLList } = require('graphql');
const AuthorType = require('../types/AuthorType');
const Author = require('../../models/Author');

const authorQueries = {
  authors: {
    type: new GraphQLList(AuthorType),
    resolve() {
      return Author.find();
    }
  }
};

module.exports = authorQueries;
