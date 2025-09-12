const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// signup and login
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
