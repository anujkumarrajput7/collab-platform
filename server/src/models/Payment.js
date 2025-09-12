const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // payer (startup)
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },   // influencer (recipient)
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["initiated", "completed", "failed", "refunded"], default: "initiated" },
    platformFee: { type: Number, default: 0 } // captured later
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
