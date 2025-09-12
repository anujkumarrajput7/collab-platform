const Campaign = require("../models/Campaign");
const Startup = require("../models/Startup");

exports.create = async (req, res) => {
  try {
    const { title, description, startupId, platforms, minFollowers, category, budget, requirements } = req.body;
    if (!title || !startupId) return res.status(400).json({ message: "title and startupId required" });

    // basic check: startup belongs to user or admin
    const startup = await Startup.findById(startupId);
    if (!startup) return res.status(404).json({ message: "Startup not found" });
    if (!req.user._id.equals(startup.createdBy) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed to create campaign for this startup" });
    }

    const campaign = await Campaign.create({
      title, description, startup: startupId, createdBy: req.user._id,
      platforms, minFollowers, category, budget, requirements
    });
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const q = req.query.q || "";
    const minFollowers = Number(req.query.minFollowers) || 0;
    const filter = {
      title: { $regex: q, $options: "i" },
      minFollowers: { $lte: minFollowers === 0 ? Number.MAX_SAFE_INTEGER : req.query.minFollowers }
    };
    // simple search
    const campaigns = await Campaign.find({ title: { $regex: q, $options: "i" } }).populate("startup createdBy");
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const c = await Campaign.findById(req.params.id).populate("startup createdBy");
    if (!c) return res.status(404).json({ message: "Campaign not found" });
    res.json(c);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
