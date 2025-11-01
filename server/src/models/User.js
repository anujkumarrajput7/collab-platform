const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const socialProfileSchema = new mongoose.Schema({
  platform: { type: String, enum: ["instagram", "youtube", "tiktok", "other"], default: "other" },
  handle: String,
  followersCount: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  proofUrl: String // link to screenshot or analytics (for manual verification)
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["influencer", "company", "admin"], default: "influencer" },
    bio: String,
    socialProfiles: [socialProfileSchema],
    // Gamification for influencers
    stats: {
      coins: { type: Number, default: 0 },
      totalEarnings: { type: Number, default: 0 },
      campaignsCompleted: { type: Number, default: 0 },
      currentStreak: { type: Number, default: 0 },
      bestStreak: { type: Number, default: 0 },
      lastActiveDate: Date,
      avgResponseTime: { type: Number, default: 0 }, // in hours
      rating: { type: Number, default: 5.0, min: 0, max: 5 },
      totalReviews: { type: Number, default: 0 }
    },
    achievements: [{
      id: String,
      name: String,
      earnedAt: { type: Date, default: Date.now }
    }]
  },
  { timestamps: true }
);

// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);
