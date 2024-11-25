const express = require("express");
const Team = require("../models/Team");
const router = express.Router();

// Create a team
router.post("/", async (req, res) => {
  try {
    const newTeam = new Team(req.body);
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

module.exports = router;
