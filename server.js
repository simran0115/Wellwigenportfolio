const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
require("dotenv").config();

// Fix DNS issue (MongoDB Atlas)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Routes
const subscriptionRoutes = require("./routes/subscriptionRoutes");

// App init
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/subscription", subscriptionRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("WellWigen Backend Running 🚀");
});

// MongoDB connection
if (!process.env.MONGO_URL) {
  console.error("❌ Missing MONGO_URL in .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "wellwigen",
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// 🔥 CHANGE PORT HERE
const PORT = 5000;

// 🔥 IMPORTANT: bind to 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});