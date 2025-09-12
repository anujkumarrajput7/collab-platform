const express = require("express");
const router = express.Router();
const Startup = require("../models/Startup");

// GET /api/startups?search=abc
router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";
    const startups = await Startup.find({
      name: { $regex: search, $options: "i" },
    }).limit(10);

    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/startups  (optional - to add new startup)
router.post("/", async (req, res) => {
  try {
    const startup = await Startup.create(req.body);
    res.status(201).json(startup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
