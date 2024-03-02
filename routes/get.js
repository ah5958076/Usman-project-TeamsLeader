const express = require("express");
const KanbanProjects = require("../../modals/kanban");

const apiGet = express.Router();

apiGet.get("/api/kanban/project/:projectId", async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Find the project by ID
    const kanbanProject = await KanbanProjects.findById(projectId);

    if (!kanbanProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ success: true, kanbanProject });
  } catch (error) {
    console.error("Error retrieving Kanban project:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = apiGet;
