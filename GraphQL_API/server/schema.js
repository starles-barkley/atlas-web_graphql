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
      args: { id: { type: GraphQLString } }, // Argument to filter by task id
      resolve(parent, args) {
        // Mock data for testing
        const tasks = [
          { id: '1', title: 'Task 1', weight: 5, description: 'First Task' },
          { id: '2', title: 'Task 2', weight: 8, description: 'Second Task' },
          { id: '3', title: 'Task 3', weight: 12, description: 'Third Task' }
        ];

        // Find and return the task by id
        return tasks.find(task => task.id === args.id);
      }
    }
  }
});

// Export the GraphQL schema with the RootQuery
module.exports = new GraphQLSchema({
  query: RootQuery
});
