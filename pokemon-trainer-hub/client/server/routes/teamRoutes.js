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
    console.log("Incoming request to create a team:", req.body); // Log request body

    const { name, pokemon } = req.body;

    if (!name || !pokemon || pokemon.length === 0) {
      console.error("Validation error: Missing name or Pokémon data");
      return res.status(400).json({ error: "Team name and Pokémon are required" });
    }

    // Fetch types for each Pokémon in the team
    const pokemonWithTypes = await Promise.all(
      pokemon.map(async (poke) => {
        const types = await fetchPokemonType(poke.name);
        return { ...poke, type: types }; // Add types to each Pokémon object
      })
    );

    console.log("Enriched Pokémon data with types:", pokemonWithTypes);

    // Create a new team with enriched Pokémon data
    const newTeam = new Team({ name, pokemon: pokemonWithTypes });
    const savedTeam = await newTeam.save();
    console.log("Team saved successfully:", savedTeam);

    res.json(savedTeam);
  } catch (err) {
    console.error("Error saving team:", err); // Log the error
    res.status(500).json({ error: "Failed to create team" });
  }
});

// Get all teams
router.get("/", async (req, res) => {
  try {
    console.log("Fetching all teams...");
    const teams = await Team.find();
    console.log("Teams fetched successfully:", teams);
    res.json(teams);
  } catch (err) {
    console.error("Error fetching teams:", err);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

// Update a team by ID
router.put("/:id", async (req, res) => {
  try {
    console.log(`Incoming request to update team with ID: ${req.params.id}`, req.body);
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTeam) {
      console.error("Team not found for update:", req.params.id);
      return res.status(404).json({ error: "Team not found" });
    }
    console.log("Team updated successfully:", updatedTeam);
    res.json(updatedTeam);
  } catch (err) {
    console.error("Error updating team:", err);
    res.status(500).json({ error: "Failed to update team" });
  }
});

// Delete a team by ID
router.delete("/:id", async (req, res) => {
  try {
    console.log(`Incoming request to delete team with ID: ${req.params.id}`);
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      console.error("Team not found for deletion:", req.params.id);
      return res.status(404).json({ error: "Team not found" });
    }
    console.log("Team deleted successfully:", deletedTeam);
    res.json({ message: "Team deleted successfully" });
  } catch (err) {
    console.error("Error deleting team:", err);
    res.status(500).json({ error: "Failed to delete team" });
  }
});

module.exports = router;

