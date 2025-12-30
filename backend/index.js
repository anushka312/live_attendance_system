require("dotenv").config();
const http = require("http");
const { startWebSocketServer } = require("./services/wsServer");
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const classRoutes = require("./routes/classRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");

mongoose.set("autoIndex", false);
connectDB();
mongoose.connection.once("open", async () => {
  try {
    await mongoose.connection.db
      .collection("users")
      .dropIndex("userId_1");
    console.log("Old userId index dropped");
  } catch (err) {
    console.log("Index already removed or not found");
  }
});


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

const server = http.createServer(app);

// Start WebSocket server
startWebSocketServer(server);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
