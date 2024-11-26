import React, { useState, useEffect } from "react";
import axios from "axios";

const TeamBuilder = () => {
  const [pokemon, setPokemon] = useState([]); //list of Pokémon fetched from API
  const [team, setTeam] = useState([]); //user's selected team
  const [error, setError] = useState(null); //handle API errors

  //fetch Pokémon data on component mount
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pokemon");
        setPokemon(response.data);
      } catch (err) {
        setError("Failed to load Pokémon. Please try again.");
        console.error("Error fetching Pokémon:", err);
      }
    };
    fetchPokemon();
  }, []);

  //add Pokés to team
  const addToTeam = (poke) => {
    if (team.length < 6 && !team.find((member) => member.name === poke.name)) {
      setTeam([...team, poke]);
    } else if (team.find((member) => member.name === poke.name)) {
      alert(`${poke.name} is already in your team!`);
    } else {
      alert("Your team is full! Max 6 Pokémon allowed.");
    }
  };

  //remove Pokés from team
  const removeFromTeam = (poke) => {
    setTeam(team.filter((member) => member.name !== poke.name));
  };

  return (
    <div>
      <h1>Build Your Pokémon Team</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Available Pokémon */}
      <div>
        <h2>Available Pokémon</h2>
        {pokemon.map((poke, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <button onClick={() => addToTeam(poke)}>
              Add {poke.name}
            </button>
            <a href={poke.url} target="_blank" rel="noopener noreferrer">
              View Details
            </a>
          </div>
        ))}
      </div>

      {/* User's Team */}
      <div>
        <h2>Your Team</h2>
        {team.map((poke, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <p>{poke.name}</p>
            <button onClick={() => removeFromTeam(poke)}>Remove</button>
          </div>
        ))}
        {team.length === 0 && <p>Your team is empty. Add Pokémon to start!</p>}
      </div>
    </div>
  );
};

export default TeamBuilder;

