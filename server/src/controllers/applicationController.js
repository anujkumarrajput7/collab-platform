const Application = require("../models/Application");
const Campaign = require("../models/Campaign");

exports.apply = async (req, res) => {
  try {
    const { campaignId, coverMessage, proposedPrice } = req.body;
    if (!campaignId) return res.status(400).json({ message: "campaignId required" });

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    // check duplicates
    const exists = await Application.findOne({ campaign: campaignId, influencer: req.user._id });
    if (exists) return res.status(400).json({ message: "Already applied" });

    const app = await Application.create({
      campaign: campaignId,
      influencer: req.user._id,
      coverMessage,
      proposedPrice
    });
    res.status(201).json(app);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.decide = async (req, res) => {
  try {
    const appId = req.params.id;
    const { action } = req.body; // 'accept' or 'reject'
    const application = await Application.findById(appId).populate("campaign");
    if (!application) return res.status(404).json({ message: "Application not found" });

    // ensure current user created campaign
    if (!application.campaign.createdBy.equals(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed to decide" });
    }

    if (action === "accept") application.status = "accepted";
    else application.status = "rejected";
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    if (req.user.role === "influencer") {
      const apps = await Application.find({ influencer: req.user._id }).populate("campaign");
      return res.json(apps);
    } else if (req.user.role === "company") {
      // list apps for campaigns created by this company
      const apps = await Application.find().populate("campaign influencer");
      // filter to company campaigns
      const filtered = apps.filter(a => a.campaign.createdBy?.equals(req.user._id));
      return res.json(filtered);
    } else {
      const apps = await Application.find().populate("campaign influencer");
      return res.json(apps);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
