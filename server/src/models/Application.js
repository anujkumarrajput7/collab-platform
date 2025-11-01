const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
    influencer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coverMessage: String,
    status: { 
      type: String, 
      enum: ["pending", "accepted", "rejected", "proof_submitted", "completed"], 
      default: "pending" 
    },
    proposedPrice: { type: Number, default: 0 },
    // Proof submission fields
    proof: {
      url: String, // image/video URL
      caption: String,
      submittedAt: Date,
      verified: { type: Boolean, default: false },
      verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      verifiedAt: Date
    },
    // Response time tracking
    responseTime: Number, // milliseconds from campaign creation to application
    completionTime: Number // milliseconds from accepted to proof submission
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
