const Post = require('../models/Post');

exports.create = async (req, res) => {
  try {
    const { text, mediaUrl, type, visibility, audioUrl, songTitle, songArtist } = req.body;
    const post = await Post.create({ author: req.user._id, text, mediaUrl, type, visibility, audioUrl, songTitle, songArtist });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.feed = async (req, res) => {
  try {
    const posts = await Post.find({ visibility: 'public' })
      .populate('author', 'name role avatarUrl')
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.mine = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const p = await Post.findById(req.params.id).populate('author', 'name avatarUrl role');
    if (!p) return res.status(404).json({ message: 'Post not found' });
    res.json(p);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.like = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const idx = post.likes.findIndex(u => String(u) === String(userId));
    let liked;
    if (idx >= 0) { post.likes.splice(idx, 1); liked = false; }
    else { post.likes.push(userId); liked = true; }
    await post.save();
    res.json({ liked, likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate('comments.user', 'name avatarUrl role');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const id = req.params.id;
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'text required' });
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.comments.push({ user: req.user._id, text, createdAt: new Date() });
    await post.save();
    await post.populate('comments.user', 'name avatarUrl role');
    res.status(201).json(post.comments[post.comments.length-1]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
