const express = require("express");
const router = express.Router();
const experienceController = require("../controller/ExperienceController");

// get
router.get("/:userId", experienceController.getExperienceByUserId);

// login user
router.post("/create", experienceController.createExperience);

// update
router.put("/update/:id", experienceController.updateExperience);

// delete
router.delete("/delete/:id", experienceController.deleteExperience);

module.exports = router;
