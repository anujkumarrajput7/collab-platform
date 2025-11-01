const User = require("../models/User");
const Message = require("../models/Message");

/**
 * Get all users (for messaging/contact list)
 */
exports.getAll = async (req, res) => {
  try {
    const contactsOnly = req.query.contacts === '1';
    let users = await User.find({ _id: { $ne: req.user._id } }).select('-password');
    if (contactsOnly && req.user.role === 'influencer') {
      // Keep influencers + companies that have messaged first or have accepted application with this influencer
      const companiesMessaged = await Message.find({ to: req.user._id }).distinct('from');
      const acceptedApps = await require('../models/Application').find({ influencer: req.user._id, status: 'accepted' }).populate('campaign');
      const allowedCompanyIds = new Set([
        ...companiesMessaged.map(String),
        ...acceptedApps.map(a => String(a.campaign?.createdBy || '')),
      ]);
      users = users.filter(u => u.role === 'influencer' || allowedCompanyIds.has(String(u._id)));
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * me - my user
 */
exports.me = async (req, res) => {
  res.json(req.user);
};

exports.updateMe = async (req, res) => {
  try {
    const { name, bio, avatarUrl } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (name !== undefined) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;
    await user.save();
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, bio: user.bio, avatarUrl: user.avatarUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Add social profile (platform, handle, followersCount, proofUrl)
 */
exports.addSocialProfile = async (req, res) => {
  try {
    const { platform, handle, followersCount, proofUrl } = req.body;
    if (!platform || !handle) return res.status(400).json({ message: "platform & handle required" });

    const user = await User.findById(req.user._id);
    user.socialProfiles.push({ platform, handle, followersCount: followersCount || 0, proofUrl });
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Request verification for a profile index
 * This will mark 'verified' as false and set a flag for admin review (here we keep a simple approach)
 */
exports.requestVerification = async (req, res) => {
  try {
    const idx = Number(req.params.index);
    const user = await User.findById(req.user._id);
    if (!user || !user.socialProfiles[idx]) return res.status(404).json({ message: "Profile not found" });
    // set a 'pending' field (we'll use verified:false and proofUrl left)
    user.socialProfiles[idx].verified = false;
    await user.save();
    // In real system: notify admin for review or trigger API verification
    res.json({ message: "Verification requested. Admin will review." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifySocialProfile = async (req, res) => {
  try {
    const { userId, index } = req.params;
    const idx = Number(index);
    const user = await User.findById(userId);
    if (!user || !user.socialProfiles[idx]) return res.status(404).json({ message: "Profile not found" });

    user.socialProfiles[idx].verified = true;
    await user.save();
    res.json({ message: "Profile verified", profile: user.socialProfiles[idx] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Admin: list users with pending social verifications
 */
exports.listPendingVerifications = async (req, res) => {
  try {
    const users = await User.find({ 'socialProfiles.verified': false })
      .select('name email socialProfiles');
    // Only include unverified entries with their index
    const pending = users.map(u => ({
      _id: u._id,
      name: u.name,
      email: u.email,
      profiles: (u.socialProfiles || []).map((p, idx) => ({ ...p.toObject(), index: idx })).filter(p => !p.verified)
    })).filter(u => u.profiles.length > 0);
    res.json(pending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
