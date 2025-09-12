const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: String,
    location: String,
    founder: String,
    website: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Startup", startupSchema);
