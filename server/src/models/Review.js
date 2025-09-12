const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who left review
    reviewee: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who review is for
    rating: { type: Number, min: 1, max: 5 },
    comment: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
