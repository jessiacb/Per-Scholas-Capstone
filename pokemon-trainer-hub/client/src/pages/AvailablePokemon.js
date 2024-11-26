import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AvailablePokemon.css";

const AvailablePokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pokemon");
        const detailedPokemon = await Promise.all(
          response.data.map(async (poke) => {
            const details = await axios.get(poke.url);
            return {
              name: poke.name,
              image: details.data.sprites.front_default,
              types: details.data.types.map((type) => type.type.name),
              stats: details.data.stats.map((stat) => ({
                name: stat.stat.name,
                value: stat.base_stat,
              })),
              abilities: details.data.abilities.map(
                (ability) => ability.ability.name
              ),
            };
          })
        );
        setPokemon(detailedPokemon);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Pokémon details:", err);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) return <p>Loading Pokémon...</p>;

  return (
    <div className="available-pokemon">
      <div className="content-box">
        <h1>Available Pokémon</h1>
        <div className="pokemon-list">
          {pokemon.map((poke, index) => (
            <div key={index} className="pokemon-card">
              <h2>{poke.name}</h2>
              <img src={poke.image} alt={poke.name} className="pokemon-image" />
              <p>
                <strong>Types:</strong> {poke.types.join(", ")}
              </p>
              <p>
                <strong>Abilities:</strong> {poke.abilities.join(", ")}
              </p>
              <h3>Stats:</h3>
              <ul>
                {poke.stats.map((stat, idx) => (
                  <li key={idx}>
                    {stat.name}: {stat.value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailablePokemon;
