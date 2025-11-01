const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    startup: { type: mongoose.Schema.Types.ObjectId, ref: "Startup", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // company user
    platforms: [{ type: String }], // e.g. ["instagram","youtube"]
    minFollowers: { type: Number, default: 500 },
    category: String, // food, travel, education etc
    budget: { type: Number, default: 0 },
    isPaid: { type: Boolean, default: true },
    status: { type: String, enum: ["open", "closed", "in-progress", "completed"], default: "open" },
    requirements: { type: String }, // more details
    // Real-time auction features
    fastestWins: { type: Boolean, default: false }, // First to apply wins
    deliveryTime: { type: Number, default: 72 }, // Hours expected for delivery
    expiresAt: Date, // Campaign expiry
    // Gamification
    coinsReward: { type: Number, default: 10 }, // Bonus coins for completion
    urgency: { type: String, enum: ["low", "medium", "high", "urgent"], default: "medium" },
    // Analytics
    views: { type: Number, default: 0 },
    applicationsCount: { type: Number, default: 0 },
    winnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Accepted influencer
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
