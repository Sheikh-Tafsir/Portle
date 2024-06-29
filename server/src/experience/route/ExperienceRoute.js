const express = require("express");
const router = express.Router();
const experienceController = require("../controller/ExperienceController");

// login user
router.get("/:id", experienceController.geExperienceByUserId);

module.exports = router;
