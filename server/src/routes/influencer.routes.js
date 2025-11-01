const express = require("express");
const router = express.Router();
const influencerController = require("../controllers/influencerController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// get all influencers (for messaging)
router.get("/", auth, influencerController.getAll);

// get own profile
router.get("/me", auth, influencerController.me);
// update own profile (name, bio, avatarUrl)
router.post("/me", auth, influencerController.updateMe);

// add social profile
router.post("/social", auth, influencerController.addSocialProfile);

// request verification (manual)
router.post("/social/:index/request", auth, influencerController.requestVerification);

// admin verifies profile
router.post("/social/:userId/:index/verify", auth, role("admin"), influencerController.verifySocialProfile);

// admin pending verifications
router.get("/pending-verifications", auth, role("admin"), influencerController.listPendingVerifications);

module.exports = router;
