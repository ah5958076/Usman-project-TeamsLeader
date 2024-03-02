const express = require("express");
const KanbanProjects = require("../../modals/kanban");

const apiPut = express.Router();

apiPut.put("/api/kanban/project/:projectId", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { name, tasks, columns, columnOrder } = req.body;

    // Find the existing project by ID
    const existingProject = await KanbanProjects.findById(projectId);

    if (!existingProject) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }

    // Update project properties
    existingProject.name = name || existingProject.name;
    existingProject.tasks = tasks || existingProject.tasks;
    existingProject.columns = columns || existingProject.columns;
    existingProject.columnOrder = columnOrder || existingProject.columnOrder;

    // Save the updated project to the database
    const updatedProject = await existingProject.save();

    res.json({ success: true, updatedProject });
  } catch (error) {
    console.error("Error updating Kanban project:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = apiPut;
