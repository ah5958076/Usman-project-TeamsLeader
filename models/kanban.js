const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String },
  peopleId: { type: String },
  note: { type: String },
  budget: { type: String },
  files: { type: Array, default: [] },
});

const columnSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String },
  taskIds: { type: Array, default: [] },
  backgroundColor: { type: String },
});

const kanbanSchema = new mongoose.Schema({
  name: { type: String },
  tasks: { type: Map, of: taskSchema, default: {} },
  columns: { type: Map, of: columnSchema, default: {} },
  columnOrder: { type: Array, default: [] },
});

const KanbanProjects = mongoose.model("KanbanProjects", kanbanSchema);

module.exports = KanbanProjects;
