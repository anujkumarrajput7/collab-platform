const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, reviewController.create);
router.get("/campaign/:id", reviewController.forCampaign);

module.exports = router;
