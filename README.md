Pokémon Trainer Hub

Welcome to the Pokémon Trainer Hub, a web application designed for Pokémon enthusiasts to build and manage their Pokémon teams. This project demonstrates full-stack web development using MongoDB, Express, React, and Node.js (MERN stack) while integrating the Pokémon API.

Features

Available Pokémon View: Explore a list of Pokémon fetched from the Pokémon API, complete with names, types, stats, abilities, and images.
Team Builder: Add Pokémon to your team (up to six Pokémon per team) and assign a custom team name.
My Teams: View, edit, and delete your saved Pokémon teams with real-time updates.
Navigation: Seamless navigation between pages using React Router.
Responsive Design: Styled using CSS and Bootstrap for a polished, user-friendly experience.
Technologies Used

Frontend
React: For building dynamic and interactive user interfaces.
React Router: For managing navigation and routing.
CSS: For styling and layout.
Bootstrap: For additional styling and responsiveness.
Backend
Node.js: For server-side logic.
Express.js: For creating RESTful API routes.
MongoDB: For database management.
Mongoose: For schema modeling and database interactions.
APIs
Pokémon API: For fetching Pokémon details such as names, types, stats, and images.
Pages and Views

Home Page: A welcoming introduction to the Pokémon Trainer Hub with a visually appealing design and embedded content.
Available Pokémon: A list of Pokémon fetched from the Pokémon API, displayed on styled cards with Pokémon details.
Team Builder: A page where users can build their Pokémon teams, assign team names, and save them to the database.
My Teams: A page to view, edit, and delete previously saved Pokémon teams.
Setup Instructions

Follow these steps to set up and run the project locally:

1. Clone the Repository
git clone <repository-url>
cd <repository-folder>
2. Install Dependencies
Navigate to the server and client folders and install the required dependencies:

# Backend
cd server
npm install

# Frontend
cd client
npm install
3. Environment Variables
Create a .env file in the server folder with the following details:

MONGO_URI=<Your MongoDB connection string>
PORT=5000
4. Start the Application
Start the backend server and the frontend client:

# Backend
cd server
node server.js

# Frontend
cd client
npm start
Project Demonstrations

Pokémon API Integration: Fetch Pokémon data dynamically and display it in the application.
Team Management: Save, edit, and delete teams, demonstrating full CRUD operations.
Database Interaction: Use MongoDB and Mongoose to persist user data.
React State Management: Manage dynamic application state with React Hooks.
Responsive Design: Ensures a consistent user experience across devices.
Future Enhancements

Authentication: Add user login and registration to secure team management features.
Advanced Pokémon Search: Include filters to search Pokémon by type, stats, or abilities.
Team Sharing: Enable users to share their Pokémon teams via links or social media.
Acknowledgments

Pokémon API: For providing the Pokémon data.
Per Scholas: For supporting this capstone project.
MERN Stack: For providing the tools and frameworks to build this application.
