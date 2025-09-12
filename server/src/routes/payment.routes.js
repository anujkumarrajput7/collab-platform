const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// create payment (startup pays)
router.post("/create", auth, role("company", "admin"), paymentController.create);

// complete payment (simulate)
router.post("/complete/:id", auth, role("company", "admin"), paymentController.complete);

// get payments (admin/own)
router.get("/", auth, paymentController.list);

module.exports = router;
