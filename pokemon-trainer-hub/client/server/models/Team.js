const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: [String], required: true }, // Array of strings for types
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pokemon: { type: [pokemonSchema], required: true }, // Array of Pokémon objects
});

module.exports = mongoose.model("Team", teamSchema);
