const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "defaultsecret", { expiresIn: "30d" });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, bio, socialProfiles } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email and password" });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    // Basic influencer eligibility check
    let extras = {};
    if (role === 'influencer') {
      const profiles = Array.isArray(socialProfiles) ? socialProfiles : [];
      if (profiles.length === 0) {
        return res.status(400).json({ message: "At least one social profile is required" });
      }
      const ok = profiles.every(p => (p.followersCount || 0) >= 10 && (p.proofUrl || p.profileUrl));
      if (!ok) {
        return res.status(400).json({ message: "Each social profile must have >= 10 followers and a proof/profile URL" });
      }
      // Store unverified; will be reviewed later
      extras.socialProfiles = profiles.map(p => ({ ...p, verified: false }));
    }

    const user = await User.create({ name, email, password, role, bio, ...extras });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Provide email and password" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const matched = await user.matchPassword(password);
    if (!matched) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
