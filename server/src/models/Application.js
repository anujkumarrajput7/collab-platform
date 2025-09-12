const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
    influencer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coverMessage: String,
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    proposedPrice: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
