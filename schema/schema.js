const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const bookQueries = require('./queries/bookQueries');
const authorQueries = require('./queries/authorQueries');
const bookMutations = require('./mutations/bookMutations');
const authorMutations = require('./mutations/authorMutations');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...bookQueries,
    ...authorQueries
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...bookMutations,
    ...authorMutations
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
