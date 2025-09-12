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
    status: { type: String, enum: ["open", "closed", "in-progress"], default: "open" },
    requirements: { type: String } // more details
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
