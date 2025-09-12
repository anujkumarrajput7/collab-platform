const Payment = require("../models/Payment");
const Campaign = require("../models/Campaign");

/**
 * NOTE:
 * This is a simulated payment flow for now.
 * Later integrate Stripe / Razorpay in services/paymentService.js
 */

exports.create = async (req, res) => {
  try {
    const { campaignId, amount, currency } = req.body;
    if (!campaignId || !amount) return res.status(400).json({ message: "campaignId and amount required" });

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    // only startup that created campaign (or admin) can pay
    if (!campaign.createdBy.equals(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to pay for this campaign" });
    }

    const payment = await Payment.create({
      campaign: campaignId,
      from: req.user._id,
      to: null,
      amount,
      currency: currency || "INR",
      status: "initiated"
    });

    // In real flow: create payment intent with Stripe and return client_secret
    res.status(201).json({ payment, clientSecret: "SIMULATED_CLIENT_SECRET" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.complete = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findById(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    // mark completed
    payment.status = "completed";
    await payment.save();

    res.json({ message: "Payment completed (simulated)", payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const payments = await Payment.find().populate("from to campaign");
      return res.json(payments);
    } else {
      const payments = await Payment.find({ from: req.user._id }).populate("campaign to");
      return res.json(payments);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
