import React, { useState, useEffect } from "react";

const MyTeams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await fetch("http://localhost:5000/api/teams");
      const data = await response.json();
      setTeams(data);
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTeams;

