const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGO_URI; // Ensure this matches the URI in your .env file
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Pinged your deployment. Successfully connected to MongoDB!");

    // Optional: Export the database object to use it in other routes
    app.locals.db = client.db("pokemonhub"); // Replace "pokemonhub" with your database name
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

// Initialize connection
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB!");
});

// Routes (you can continue to add your API routes here)
app.use("/api/pokemon", require("./routes/pokemonRoutes"));
app.use("/api/teams", require("./routes/teamRoutes"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
