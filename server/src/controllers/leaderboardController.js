const User = require("../models/User");
const Application = require("../models/Application");

exports.getLeaderboard = async (req, res) => {
  try {
    const { timeframe = 'all', limit = 50 } = req.query;
    
    // Get influencers only
    const query = { role: 'influencer' };
    
    // Fetch and sort by different metrics
    const topByEarnings = await User.find(query)
      .select('name email stats achievements')
      .sort({ 'stats.totalEarnings': -1 })
      .limit(Number(limit));
    
    const topByCampaigns = await User.find(query)
      .select('name email stats achievements')
      .sort({ 'stats.campaignsCompleted': -1 })
      .limit(Number(limit));
    
    const topByStreak = await User.find(query)
      .select('name email stats achievements')
      .sort({ 'stats.currentStreak': -1 })
      .limit(Number(limit));
    
    const topByRating = await User.find(query)
      .select('name email stats achievements')
      .sort({ 'stats.rating': -1, 'stats.totalReviews': -1 })
      .limit(Number(limit));
    
    // Get fastest responders (lowest avg response time)
    const fastestResponders = await User.find(query)
      .select('name email stats achievements')
      .sort({ 'stats.avgResponseTime': 1 })
      .limit(Number(limit));
    
    res.json({
      topByEarnings,
      topByCampaigns,
      topByStreak,
      topByRating,
      fastestResponders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyRank = async (req, res) => {
  try {
    if (req.user.role !== 'influencer') {
      return res.status(400).json({ message: 'Only influencers have rankings' });
    }
    
    const userId = req.user._id;
    const user = await User.findById(userId).select('name email stats achievements');
    
    // Calculate rank by earnings
    const earningsRank = await User.countDocuments({
      role: 'influencer',
      'stats.totalEarnings': { $gt: user.stats.totalEarnings }
    }) + 1;
    
    // Calculate rank by campaigns
    const campaignsRank = await User.countDocuments({
      role: 'influencer',
      'stats.campaignsCompleted': { $gt: user.stats.campaignsCompleted }
    }) + 1;
    
    // Calculate rank by streak
    const streakRank = await User.countDocuments({
      role: 'influencer',
      'stats.currentStreak': { $gt: user.stats.currentStreak }
    }) + 1;
    
    res.json({
      user,
      ranks: {
        earnings: earningsRank,
        campaigns: campaignsRank,
        streak: streakRank
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLiveActivity = async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    
    // Get recent completed applications
    const recentActivity = await Application.find({
      status: { $in: ['completed', 'proof_submitted', 'accepted'] }
    })
      .sort({ updatedAt: -1 })
      .limit(Number(limit))
      .populate('influencer', 'name email')
      .populate('campaign', 'title budget')
      .select('status updatedAt proof responseTime');
    
    res.json(recentActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = exports;
