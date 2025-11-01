const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: String,
    // Optional attachment: share a post/reel
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", msgSchema);
