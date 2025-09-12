const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// influencer applies
router.post("/", auth, role("influencer"), applicationController.apply);

// company accepts/rejects - protected
router.post("/:id/decide", auth, role("company", "admin"), applicationController.decide);

// list applications for influencer/company
router.get("/", auth, applicationController.list);

module.exports = router;
