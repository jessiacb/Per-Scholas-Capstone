const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Use mongoose for better debugging and features
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug Middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10-second timeout for initial connection
    });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Initialize the Database Connection
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB!");
});

// Poké Routes
app.use("/api/pokemon", require("./routes/pokemonRoutes"));

// Team Routes
app.use("/api/teams", require("./routes/teamRoutes"));

// Handle Undefined Routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
