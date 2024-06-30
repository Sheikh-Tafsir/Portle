const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");

// get all user
router.get("", userController.getAllUsers);

//update user by id
router.put("/:id", userController.updateUser);

//delete user by id
router.delete("/:id", userController.deleteUser);

// //get user by id
// router.get("/:id", userController.getUsersById);

//get user by username
router.get("/:username", userController.getUsersByUsername);

//get user info by cv
router.post("/extractcv/:id", userController.extarctInformationFromCv);

//get user info by from github
router.post("/extractgithub/:id", userController.extarctInformationFromGithub);

module.exports = router;
