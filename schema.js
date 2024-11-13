// Importing required GraphQL types using object destructuring
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');

// Define the TaskType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString }
  })
});

// Define the RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      resolve(parent, args) {
        // Placeholder resolve function, usually will fetch data from a database or other source
        return {
          id: '1',
          title: 'Sample Task',
          weight: 10,
          description: 'This is a sample task description'
        };
      }
    }
  }
});

// Export the GraphQL schema
module.exports = new GraphQLSchema({
  query: RootQuery
});
