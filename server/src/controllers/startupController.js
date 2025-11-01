const Startup = require("../models/Startup");

exports.create = async (req, res) => {
  try {
    const { name, industry, location, description, website } = req.body;
    if (!name || !industry) return res.status(400).json({ message: "Name and industry required" });
    const startup = await Startup.create({
      name, industry, location, description, website, createdBy: req.user._id
    });
    res.status(201).json(startup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const q = req.query.q || "";
    const startups = await Startup.find({ name: { $regex: q, $options: "i" } }).populate("createdBy", "name email");
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMine = async (req, res) => {
  try {
    const items = await Startup.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const s = await Startup.findById(req.params.id).populate("createdBy", "name email");
    if (!s) return res.status(404).json({ message: "Startup not found" });
    res.json(s);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
