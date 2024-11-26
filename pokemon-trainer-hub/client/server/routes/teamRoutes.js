const express = require("express");
const Team = require("../models/Team"); // Team schema
const axios = require("axios");
const router = express.Router();

// Function to fetch Pokémon types from the API
async function fetchPokemonType(pokemonName) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const types = response.data.types.map((type) => type.type.name); // Extract types
    return types;
  } catch (err) {
    console.error(`Error fetching types for ${pokemonName}:`, err);
    return []; // Return an empty array if there's an error
  }
}

// Create a team
router.post("/", async (req, res) => {
  try {
    const { name, pokemon } = req.body;

    // Fetch types for each Pokémon in the team
    const pokemonWithTypes = await Promise.all(
      pokemon.map(async (poke) => {
        const types = await fetchPokemonType(poke.name);
        return { ...poke, type: types }; // Add types to each Pokémon object
      })
    );

    // Create a new team with enriched Pokémon data
    const newTeam = new Team({ name, pokemon: pokemonWithTypes });
    const savedTeam = await newTeam.save();
    res.json(savedTeam);
  } catch (err) {
    res.status(500).json({ error: "Failed to create team" });
  }
});

// Get all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

// Update a team by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(updatedTeam);
  } catch (err) {
    res.status(500).json({ error: "Failed to update team" });
  }
});

// Delete a team by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json({ message: "Team deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete team" });
  }
});

module.exports = router;
