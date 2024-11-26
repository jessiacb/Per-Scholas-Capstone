const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//debug middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

//MongoDB Connection
const uri = process.env.MONGO_URI; 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    //connect to MongoDB
    await client.connect();
    console.log("Pinged your deployment. Successfully connected to MongoDB!");

    //export the database object for other routes
    app.locals.db = client.db("PokemonHub"); // Replace "pokemonhub" with your database name
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); //exit the process on failure
  }
}

//initialize connection
connectDB();

//test Route
app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB!");
});

//Poké Routes
app.use("/api/pokemon", require("./routes/pokemonRoutes"));

//team Routes
app.use("/api/teams", require("./routes/teamRoutes"));

//handle Undefined Routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

//start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
