const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const startupRoutes = require("./routes/startup.routes");

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Connect Database
connectDB();

// ✅ Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/startups", startupRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ✅ 404 Error handling
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
