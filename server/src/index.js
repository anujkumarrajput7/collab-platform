const express = require("express");
const connectDB = require("./config/db");
const startupRoutes = require("./routes/startup.routes");

const app = express();
app.use(express.json()); // 🔑 so req.body works
connectDB();

app.use("/api/startups", startupRoutes); // ✅ route registered

app.listen(5000, () => console.log("Server running on port 5000"));
