const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    industry: { type: String, required: true },
    location: { type: String },
    description: { type: String },
    website: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Startup", startupSchema);
