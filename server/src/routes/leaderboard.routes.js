const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");
const auth = require("../middleware/authMiddleware");

// Get global leaderboard
router.get("/", leaderboardController.getLeaderboard);

// Get my rank (authenticated influencer)
router.get("/my-rank", auth, leaderboardController.getMyRank);

// Get live activity feed
router.get("/activity", leaderboardController.getLiveActivity);

module.exports = router;
