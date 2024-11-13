const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLSchema } = require('graphql');
const Task = require('./models/task');
const Project = require('./models/project');

// Define the TaskType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        // Find the project related to the task using projectId
        return Project.findById(parent.projectId);
      }
    }
  })
});

// Define the ProjectType
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        // Return all tasks related to the project by using the projectId
        return Task.find({ projectId: parent.id });
      }
    }
  })
});

// Define the RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Fetch task directly from the database
        return Task.findById(args.id); // No longer using static array
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Fetch project directly from the database
        return Project.findById(args.id); // No longer using static array
      }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        // Fetch all tasks directly from the database
        return Task.find(); // No longer using static array
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        // Fetch all projects directly from the database
        return Project.find(); // No longer using static array
      }
    }
  }
});

// Define the Mutation type
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a new project
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        // Create a new Project and save it to the database
        const project = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description
        });
        return project.save(); // Save and return the created project
      }
    },
    // Add a new task
    addTask: {
      type: TaskType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        // Create a new Task and save it to the database
        const task = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description,
          projectId: args.projectId
        });
        return task.save(); // Save and return the created task
      }
    }
  }
});

// Export the GraphQL schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
