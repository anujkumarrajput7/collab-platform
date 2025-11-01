const Application = require("../models/Application");
const Campaign = require("../models/Campaign");
const User = require("../models/User");
const { emitApplicationCreated, emitApplicationDecided, emitProofSubmitted, emitProofVerified } = require('../utils/socket');

exports.apply = async (req, res) => {
  try {
    const { campaignId, coverMessage, proposedPrice } = req.body;
    if (!campaignId) return res.status(400).json({ message: "campaignId required" });

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    // check duplicates
    const exists = await Application.findOne({ campaign: campaignId, influencer: req.user._id });
    if (exists) return res.status(400).json({ message: "Already applied" });

    // Enforce minimum followers (verified profiles only)
    const me = await User.findById(req.user._id);
    const eligible = (me?.socialProfiles || []).some(p => (p.verified || false) && (p.followersCount || 0) >= (campaign.minFollowers || 0));
    if (!eligible) {
      return res.status(403).json({ message: `You need at least ${campaign.minFollowers} verified followers to apply` });
    }

    // Calculate response time
    const responseTime = Date.now() - campaign.createdAt.getTime();
    
    const app = await Application.create({
      campaign: campaignId,
      influencer: req.user._id,
      coverMessage,
      proposedPrice,
      responseTime
    });
    
    // Update campaign application count
    await Campaign.findByIdAndUpdate(campaignId, {
      $inc: { applicationsCount: 1 }
    });
    
    // Populate for socket emission
    await app.populate('influencer campaign');
    
    // Emit real-time event
    emitApplicationCreated(app);
    
    // Auto-accept if fastest wins is enabled
    if (campaign.fastestWins) {
      app.status = 'accepted';
      await app.save();
      
      // Update campaign with winner
      campaign.status = 'in-progress';
      campaign.winnerId = req.user._id;
      await campaign.save();
      
      emitApplicationDecided(app);
    }
    
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

exports.submitProof = async (req, res) => {
  try {
    const appId = req.params.id;
    const { proofUrl, caption } = req.body;
    
    const application = await Application.findById(appId).populate('campaign influencer');
    if (!application) return res.status(404).json({ message: "Application not found" });
    
    // Ensure current user is the influencer
    if (!application.influencer._id.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    if (application.status !== 'accepted') {
      return res.status(400).json({ message: "Application must be accepted first" });
    }
    
    // Calculate completion time
    const acceptedAt = application.updatedAt; // Assuming updated when accepted
    const completionTime = Date.now() - acceptedAt.getTime();
    
    application.proof = {
      url: proofUrl,
      caption,
      submittedAt: new Date(),
      verified: false
    };
    application.status = 'proof_submitted';
    application.completionTime = completionTime;
    await application.save();
    
    // Update campaign status
    await Campaign.findByIdAndUpdate(application.campaign._id, {
      status: 'in-progress'
    });
    
    // Emit real-time event
    emitProofSubmitted(application);
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyProof = async (req, res) => {
  try {
    const appId = req.params.id;
    const { approved } = req.body;
    
    const application = await Application.findById(appId).populate('campaign influencer');
    if (!application) return res.status(404).json({ message: "Application not found" });
    
    // Ensure current user is the campaign creator or admin
    if (!application.campaign.createdBy.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    if (application.status !== 'proof_submitted') {
      return res.status(400).json({ message: "No proof to verify" });
    }
    
    if (approved) {
      application.proof.verified = true;
      application.proof.verifiedBy = req.user._id;
      application.proof.verifiedAt = new Date();
      application.status = 'completed';
      
      // Update campaign
      await Campaign.findByIdAndUpdate(application.campaign._id, {
        status: 'completed',
        winnerId: application.influencer._id
      });
      
      // Update influencer stats
      const influencer = await User.findById(application.influencer._id);
      influencer.stats.campaignsCompleted += 1;
      influencer.stats.totalEarnings += application.campaign.budget || 0;
      influencer.stats.coins += application.campaign.coinsReward || 10;
      
      // Update streak
      const today = new Date().setHours(0, 0, 0, 0);
      const lastActive = influencer.stats.lastActiveDate ? 
        new Date(influencer.stats.lastActiveDate).setHours(0, 0, 0, 0) : null;
      
      if (lastActive && today - lastActive === 86400000) { // 24 hours
        influencer.stats.currentStreak += 1;
        if (influencer.stats.currentStreak > influencer.stats.bestStreak) {
          influencer.stats.bestStreak = influencer.stats.currentStreak;
        }
      } else if (!lastActive || today - lastActive > 86400000) {
        influencer.stats.currentStreak = 1;
      }
      influencer.stats.lastActiveDate = new Date();
      
      await influencer.save();
      
      // Emit events
      emitProofVerified(application);
    } else {
      application.status = 'accepted'; // Back to accepted, needs resubmission
    }
    
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
