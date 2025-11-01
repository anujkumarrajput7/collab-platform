const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['post', 'reel'], default: 'post' },
  text: String,
  mediaUrl: String, // image or video URL
  // Optional audio track for posts/reels
  audioUrl: String,
  songTitle: String,
  songArtist: String,
  visibility: { type: String, enum: ['public', 'followers'], default: 'public' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);