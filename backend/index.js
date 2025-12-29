require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = 5000;

// middleware
app.use(express.json());

// routes
app.use("/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// start server
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
