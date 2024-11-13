// models/project.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define project schema
const projectSchema = new Schema({
  title: { type: String, required: true },
  weight: { type: Number, required: true },
  description: { type: String, required: true }
});

// Create and export the Project model
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
