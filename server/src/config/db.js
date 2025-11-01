const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/createrra';
    await mongoose.connect(uri, {
      // options are fine with mongoose v7+
    });
    console.log("✅ MongoDB Connected:", uri);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
