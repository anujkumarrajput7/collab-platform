const express = require("express");
const router = express.Router();
const Startup = require("../models/Startup");

// Create new startup
router.post("/", async (req, res) => {
  try {
    if (!req.body.name || !req.body.industry) {
      return res.status(400).json({ message: "Name and industry are required" });
    }
    const startup = await Startup.create(req.body);
    res.status(201).json(startup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all startups (with optional search query)
router.get("/", async (req, res) => {
  try {
    const search = req.query.q || "";
    const startups = await Startup.find({
      name: { $regex: search, $options: "i" },
    });
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
