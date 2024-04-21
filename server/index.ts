// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const cookieParser = require('cookie-parser');
const routes = require("./routes");

// Create an express application
const app = express();

// Apply middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
})); // Enable CORS (Cross-Origin Resource Sharing)
app.use(bodyParser.json()); // Parse JSON bodies (as sent by API clients)
app.use(cookieParser())

// Set up database connection and models
import { Sequelize, DataTypes } from "sequelize";
const sequelize = require("./config/database")(Sequelize); // Initialize Sequelize with configuration from config/index.js
const User = require("./models/User")(sequelize, DataTypes); // Import the User model

// Import all the routes from ./routes/index.js
app.use(routes);

// Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER RUNNING"); // Log that the server is running
});
