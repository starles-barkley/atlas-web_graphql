const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema');

// Import Task and Project models
const Task = require('./models/task');
const Project = require('./models/project');

const app = express();

// MongoDB Atlas connection string (replace <username>, <password>, <dbname> with your info)
const dbURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.log('Error connecting to database:', err);
  });

// GraphQL middleware setup
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

// Start the server
app.listen(4000, () => {
  console.log('Server running on http://localhost:4000/graphql');
});
