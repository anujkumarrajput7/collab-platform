const path = require('path');

exports.upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const url = `/uploads/${req.file.filename}`;
    res.status(201).json({ url });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};