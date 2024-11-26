import React, { useState, useEffect } from "react";
import axios from "axios";

const MyTeams = () => {
  const [teams, setTeams] = useState([]);
  const [editMode, setEditMode] = useState(null); // Track the team being edited
  const [updatedTeam, setUpdatedTeam] = useState({}); // Temporarily store updated data

  // Fetch all teams from the backend
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/teams");
        setTeams(response.data);
      } catch (err) {
        console.error("Error fetching teams:", err);
        alert("Failed to fetch teams.");
      }
    };
    fetchTeams();
  }, []);

  // Handle delete team
  const deleteTeam = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teams/${id}`);
      setTeams(teams.filter((team) => team._id !== id)); // Update state
    } catch (err) {
      console.error("Error deleting team:", err);
      alert("Failed to delete team.");
    }
  };

  // Save updated team
  const saveEdit = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/teams/${id}`, updatedTeam);
      setTeams(teams.map((team) => (team._id === id ? response.data : team))); // Update state
      setEditMode(null); // Exit edit mode
    } catch (err) {
      console.error("Error updating team:", err);
      alert("Failed to update team.");
    }
  };

  // Handle edit mode
  const startEditMode = (team) => {
    setEditMode(team._id);
    setUpdatedTeam({ ...team }); // Clone the team data for editing
  };

  // Update team name or Pokémon during editing
  const handleUpdate = (field, value, index = null) => {
    if (index !== null) {
      // Update Pokémon at a specific index
      const updatedPokemon = [...updatedTeam.pokemon];
      updatedPokemon[index].name = value;
      setUpdatedTeam({ ...updatedTeam, pokemon: updatedPokemon });
    } else {
      // Update the team name
      setUpdatedTeam({ ...updatedTeam, [field]: value });
    }
  };

  return (
    <div className="my-teams">
      <h1>My Teams</h1>
      {teams.map((team) => (
        <div key={team._id} className="team">
          {editMode === team._id ? (
            <div>
              <input
                type="text"
                value={updatedTeam.name}
                onChange={(e) => handleUpdate("name", e.target.value)}
                placeholder="Edit team name"
              />
              <h3>Edit Pokémon:</h3>
              {updatedTeam.pokemon.map((poke, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={poke.name}
                    onChange={(e) => handleUpdate("pokemon", e.target.value, index)}
                    placeholder="Edit Pokémon name"
                  />
                </div>
              ))}
              <button onClick={() => saveEdit(team._id)}>Save</button>
              <button onClick={() => setEditMode(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h2>{team.name}</h2>
              <h3>Pokémon:</h3>
              <ul>
                {team.pokemon.map((poke, index) => (
                  <li key={index}>{poke.name}</li>
                ))}
              </ul>
              <button onClick={() => startEditMode(team)}>Edit</button>
              <button onClick={() => deleteTeam(team._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyTeams;
