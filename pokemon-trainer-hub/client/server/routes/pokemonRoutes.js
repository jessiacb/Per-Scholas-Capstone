const express = require("express");
const axios = require("axios");
const router = express.Router();

//get Pokémon from API
router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Pokémon data" });
  }
});

module.exports = router;
