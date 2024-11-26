import React, { useState, useEffect } from "react";

const AvailablePokemon = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch("http://localhost:5000/api/pokemon");
      const data = await response.json();
      setPokemon(data);
    };
    fetchPokemon();
  }, []);

  return (
    <div>
      <h1>Available Pokémon</h1>
      <ul>
        {pokemon.map((poke, index) => (
          <li key={index}>{poke.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AvailablePokemon;

