const uuid = require("uuid");
const KanbanProjects = require("../models/kanban");




const createNewProject = async (req, res) => {
    try {
        const { name } = req.body; // Assuming you have a title for the project

        const firstTaskId = uuid.v4();
        const firstColumnId = uuid.v4();

        // Create the first task and column
        const firstTask = {
            id: firstTaskId,
            title: "First Task",
            peopleId: "",
            note: "",
            budget: "",
            files: [],
        };

        const firstColumn = {
            id: firstColumnId,
            title: "No Started",
            taskIds: [firstTaskId],
            backgroundColor: "lightgray",
        };

        // Create a new Kanban project instance
        const newKanbanProject = new KanbanProjects({
            tasks: { [firstTaskId]: firstTask },
            columns: { [firstColumnId]: firstColumn },
            columnOrder: [firstColumnId],
            name,
        });

        // Save the new project to the database
        const savedProject = await newKanbanProject.save();

        res.status(201).json(savedProject);
    } catch (error) {
        console.error("Error creating Kanban project:", error.message);
        res.status(500).send("Internal Server Error");
    }
}


const getProject = async (req, res) => {
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
}


const udpateProject = async (req, res) => {
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
}



module.exports = {
    createNewProject,
    getProject,
    udpateProject
}