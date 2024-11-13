// models/task.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define task schema
const taskSchema = new Schema({
  title: { type: String, required: true },
  weight: { type: Number, required: true },
  description: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' } // Link to project
});

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
