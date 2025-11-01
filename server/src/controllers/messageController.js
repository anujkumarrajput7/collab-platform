const Message = require("../models/Message");
const User = require("../models/User");
const Application = require("../models/Application");
const Campaign = require("../models/Campaign");

/**
 * send message
 */
exports.send = async (req, res) => {
  try {
    const { to, text, postId } = req.body;
    if (!to || (!text && !postId)) return res.status(400).json({ message: "Provide recipient and text or postId" });

    // Messaging rules:
    // - Influencers can DM influencers freely
    // - Influencers cannot DM companies unless (a) they applied to that company's campaign, or (b) the company initiated the thread
    const recipient = await User.findById(to);
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });

    if (req.user.role === 'influencer' && recipient.role !== 'influencer') {
      // Check if company initiated a prior message
      const prior = await Message.findOne({ from: recipient._id, to: req.user._id });
      if (!prior) {
        // Only allow if influencer has an ACCEPTED application for a campaign created by recipient
        const app = await Application.findOne({ influencer: req.user._id, status: 'accepted' })
          .populate({ path: 'campaign', select: 'createdBy', model: Campaign });
        const allowed = app && app.campaign && String(app.campaign.createdBy) === String(recipient._id);
        if (!allowed) {
          return res.status(403).json({ message: "You can't message companies unless they messaged you first or you have an accepted campaign with them" });
        }
      }
    }

    const payload = { from: req.user._id, to, text };
    if (postId) payload.post = postId;
    const msg = await Message.create(payload);
    res.status(201).json(await msg.populate('post'));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.thread = async (req, res) => {
  try {
    const other = req.params.userId;
    // Only allow thread if either user is influencer trying to see company chat where rules apply
    // (Read is allowed; creation is restricted in send())
    const msgs = await Message.find({
      $or: [
        { from: req.user._id, to: other },
        { from: other, to: req.user._id }
      ]
    }).sort("createdAt").populate({ path: 'post', populate: { path: 'author', select: 'name avatarUrl' } });
    res.json(msgs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
