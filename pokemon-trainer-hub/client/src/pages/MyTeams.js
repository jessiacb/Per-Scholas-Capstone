import React, { useState, useEffect } from "react";

const MyTeams = () => {
  const [teams, setTeams] = useState([]);

  // Fetch teams from the backend
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/teams");
        const data = await response.json();
        setTeams(data);
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <h1>My Teams</h1>
      <ul>
        {teams.map((team) => (
          <li key={team._id}>
            <strong>{team.name}</strong>
            <ul>
              {team.pokemon.map((poke, index) => (
                <li key={index}>{poke.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTeams;

