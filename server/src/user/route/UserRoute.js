const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const authController = require("../../auth/controller/AuthController");

// get all user
router.get("", userController.getAllUsers);

//update user by id
router.put("/:id", userController.updateUser);

//delete user by id
router.delete("/:id", userController.deleteUser);

//get user by id
router.get("/:id", userController.getUsersById);

//get user by id
router.post("/extractcv/:id", userController.extarctInformationFromCv);
module.exports = router;
