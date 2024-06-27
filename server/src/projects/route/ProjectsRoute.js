const express = require("express");
const router = express.Router();
const projectsController = require("../controller/ProjectsController");

// login user
router.get("/:id", projectsController.getProjectByUserId);

module.exports = router;
