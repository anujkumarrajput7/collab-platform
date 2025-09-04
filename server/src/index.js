// server/src/index.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";  // ✅ correct import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
