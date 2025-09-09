// src/index.js
const express = require("express");
const connectDB = require("./config/db"); // 👈 adjust path if needed

const app = express();
const PORT = 5000;

// connect to DBadd
connectDB();

app.get("/", (req, res) => {
  res.send("Server is running and MongoDB is connected ✅");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
