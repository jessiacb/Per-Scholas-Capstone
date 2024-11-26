import React, { useState } from "react";

const TeamBuilder = () => {
  const [pokemon, setPokemon] = useState([]);
  const [team, setTeam] = useState([]);
  const [teamName, setTeamName] = useState("");

  // Fetch Pokémon (example data)
  useState(() => {
    const fetchPokemon = async () => {
      const response = await fetch("http://localhost:5000/api/pokemon");
      const data = await response.json();
      setPokemon(data);
    };
    fetchPokemon();
  }, []);

  // Add a Pokémon to the team
  const addToTeam = (poke) => {
    if (team.length < 6 && !team.find((member) => member.name === poke.name)) {
      setTeam([...team, poke]);
    } else if (team.find((member) => member.name === poke.name)) {
      alert(`${poke.name} is already in your team!`);
    } else {
      alert("Your team is full! Max 6 Pokémon allowed.");
    }
  };

  // Save the team to the backend
  const saveTeam = async () => {
    if (!teamName) {
      alert("Please enter a team name.");
      return;
    }

    if (team.length === 0) {
      alert("Your team is empty. Add Pokémon to save.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: teamName, pokemon: team }),
      });

      if (response.ok) {
        alert("Team saved successfully!");
        setTeamName("");
        setTeam([]); // Clear the team after saving
      } else {
        alert("Failed to save team.");
      }
    } catch (err) {
      console.error("Error saving team:", err);
      alert("An error occurred while saving the team.");
    }
  };

  return (
    <div>
      <h1>Build Your Pokémon Team</h1>
      <div>
        <h2>Available Pokémon</h2>
        <div>
          {pokemon.map((poke, index) => (
            <button key={index} onClick={() => addToTeam(poke)}>
              {poke.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2>Your Team</h2>
        <input
          type="text"
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <ul>
          {team.map((poke, index) => (
            <li key={index}>{poke.name}</li>
          ))}
        </ul>
        <button onClick={saveTeam}>Save Team</button>
      </div>
    </div>
  );
};

export default TeamBuilder;


