const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const startupRoutes = require("./routes/startup.routes");

const app = express();
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/startups", startupRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
