const express = require("express");
const router = express.Router();
const projectsController = require("../controller/ProjectsController");

// get projects by user id
router.get("/:userId", projectsController.getProjectByUserId);

// create projects
router.post("/create", projectsController.createProject);

// create projects from github link
router.post("/createfromgithublink/:userId", projectsController.createProjectFromGithubLink);

// update project
router.put("/update/:id", projectsController.updateProject);

module.exports = router;
