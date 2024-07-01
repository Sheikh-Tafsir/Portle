const express = require("express");
const router = express.Router();
const projectsController = require("../controller/ProjectsController");

// get projects by user id
router.get("/:id", projectsController.getProjectByUserId);

// create projects from github link
router.post("/createfromgithublink/:userId", projectsController.createProjectFromGithubLink);

module.exports = router;
