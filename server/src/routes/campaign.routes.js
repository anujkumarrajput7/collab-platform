const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// public list/search
router.get("/", campaignController.search);

// create campaign (company)
router.post("/", auth, role("company", "admin"), campaignController.create);

// get single
router.get("/:id", campaignController.getOne);

// delete (company/admin)
router.delete("/:id", auth, role("company", "admin"), campaignController.remove);

module.exports = router;
