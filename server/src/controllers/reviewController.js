const Review = require("../models/Review");

exports.create = async (req, res) => {
  try {
    const { campaign, reviewee, rating, comment } = req.body;
    if (!reviewee || !rating) return res.status(400).json({ message: "reviewee and rating required" });

    const r = await Review.create({
      campaign, reviewer: req.user._id, reviewee, rating, comment
    });
    res.status(201).json(r);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.forCampaign = async (req, res) => {
  try {
    const reviews = await Review.find({ campaign: req.params.id }).populate("reviewer reviewee");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
