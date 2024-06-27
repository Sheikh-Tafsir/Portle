const express = require("express");
const router = express.Router();
const authController = require("../controller/AuthController");

// login user
router.post("/login", authController.login);

//signup user
router.post("/signup", authController.signup);

// google login user
router.post("/googlelogin", authController.googleLogin);

module.exports = router;
