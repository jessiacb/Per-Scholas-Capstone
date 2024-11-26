import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import TeamBuilder from "./pages/TeamBuilder";
import AvailablePokemon from "./pages/AvailablePokemon";
import MyTeams from "./pages/MyTeams";
import "./App.css";


function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">Pokémon Trainer Hub</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/available-pokemon">Available Pokémon</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-teams">My Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/team-builder">Team Builder</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/available-pokemon" element={<AvailablePokemon />} />
            <Route path="/my-teams" element={<MyTeams />} />
            <Route path="/team-builder" element={<TeamBuilder />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
