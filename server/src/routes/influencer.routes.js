const express = require("express");
const router = express.Router();
const influencerController = require("../controllers/influencerController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// get own profile
router.get("/me", auth, influencerController.me);

// add social profile
router.post("/social", auth, influencerController.addSocialProfile);

// request verification (manual)
router.post("/social/:index/request", auth, influencerController.requestVerification);

// admin verifies profile
router.post("/social/:userId/:index/verify", auth, role("admin"), influencerController.verifySocialProfile);

module.exports = router;
