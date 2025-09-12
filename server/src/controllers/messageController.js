const Message = require("../models/Message");

/**
 * send message
 */
exports.send = async (req, res) => {
  try {
    const { to, text } = req.body;
    if (!to || !text) return res.status(400).json({ message: "to and text required" });

    const msg = await Message.create({ from: req.user._id, to, text });
    res.status(201).json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.thread = async (req, res) => {
  try {
    const other = req.params.userId;
    const msgs = await Message.find({
      $or: [
        { from: req.user._id, to: other },
        { from: other, to: req.user._id }
      ]
    }).sort("createdAt");
    res.json(msgs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
