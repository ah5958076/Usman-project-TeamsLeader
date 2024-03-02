const KanbanProjects = require("../../modals/kanban");


apiPost.post("/api/kanban/project/new", async (req, res) => {
    try {
      const { name } = req.body; // Assuming you have a title for the project
  
      // Generate unique IDs for the project, first task, and first column
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
  });