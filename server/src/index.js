const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require('path');
require("dotenv").config();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/auth.routes");
const startupRoutes = require("./routes/startup.routes");
const influencerRoutes = require("./routes/influencer.routes");
const campaignRoutes = require("./routes/campaign.routes");
const applicationRoutes = require("./routes/application.routes");
const paymentRoutes = require("./routes/payment.routes");
const reviewRoutes = require("./routes/review.routes");
const messageRoutes = require("./routes/message.routes");
const leaderboardRoutes = require("./routes/leaderboard.routes");
const postRoutes = require("./routes/post.routes");
const uploadRoutes = require("./routes/upload.routes");

const app = express();
const server = http.createServer(app);

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(express.json());

// static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// connect DB
connectDB();

// register routes
app.use("/api/auth", authRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/influencers", influencerRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes);

// root
app.get("/", (req, res) => res.send("🚀Anmol's Collab Platform API is running..."));

// error handler (should be last)
app.use(errorHandler);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    credentials: true,
    methods: ["GET", "POST"]
  }
});

// Initialize socket utility
const socketUtil = require('./utils/socket');
socketUtil.initSocket(io);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('✨ User connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('disconnect', () => {
    console.log('👋 User disconnected:', socket.id);
  });
});

// Make io accessible to routes
app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
