const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, messageController.send);
router.get("/thread/:userId", auth, messageController.thread);

module.exports = router;
