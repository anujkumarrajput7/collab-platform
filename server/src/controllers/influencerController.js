const User = require("../models/User");

/**
 * Get all users (for messaging/contact list)
 */
exports.getAll = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select('-password');
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
