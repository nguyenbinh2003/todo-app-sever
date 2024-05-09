const express = require("express");
const router = express.Router();

const ProjectsController = require("../controllers/project.controller");

/* GET */
router.get("/", ProjectsController.getAllProject);
router.get("/:idProject", ProjectsController.getProjectById);

// POST
router.post("/add", ProjectsController.createProject);

// PATCH
router.patch("/:idProject", ProjectsController.editProject);

// DELETE
router.delete("/:idProject", ProjectsController.deleteProject);

module.exports = router;
