import React, { useState, useEffect } from "react";
import axios from "axios";

const TeamBuilder = () => {
  const [pokemon, setPokemon] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get("http://localhost:5000/api/pokemon");
      setPokemon(response.data);
    };
    fetchPokemon();
  }, []);

  const addToTeam = (poke) => {
    if (team.length < 6) setTeam([...team, poke]);
  };

  return (
    <div>
      <h1>Build Your Pokémon Team</h1>
      <div>
        <h2>Available Pokémon</h2>
        {pokemon.map((poke, index) => (
          <button key={index} onClick={() => addToTeam(poke)}>
            {poke.name}
          </button>
        ))}
      </div>
      <div>
        <h2>Your Team</h2>
        {team.map((poke, index) => (
          <p key={index}>{poke.name}</p>
        ))}
      </div>
    </div>
  );
};

export default TeamBuilder;
