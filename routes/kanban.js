const router = require("express").Router();
const {createNewProject, getProject, udpateProject} = require("../controllers/kanban");




router.post("/project/new", createNewProject);
router.get("/project/:projectId", getProject);
router.put("/project/:projectId", udpateProject);


module.exports = router;