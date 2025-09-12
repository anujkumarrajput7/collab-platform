const express = require("express");
const router = express.Router();
const startupController = require("../controllers/startupController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Public: list startups
router.get("/", startupController.getAll);

// Protected: create startup (company)
router.post("/", auth, role("company", "admin"), startupController.create);

// Get one
router.get("/:id", startupController.getOne);

module.exports = router;
