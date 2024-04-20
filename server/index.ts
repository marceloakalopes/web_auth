// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
const routes = require("./routes");
const SESSION_SECRET: string = process.env.SESSION_SECRET as string

// Create an express application
const app = express();

// Apply middleware
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(bodyParser.json()); // Parse JSON bodies (as sent by API clients)

// Set up database connection and models
import { Sequelize, DataTypes } from "sequelize";
const sequelize = require("./config/database")(Sequelize); // Initialize Sequelize with configuration from config/index.js
const User = require("./models/User")(sequelize, DataTypes); // Import the User model

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sessionStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 7 * 24 * 60 * 60 * 1000
})

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));

// Import all the routes from ./routes/index.js
app.use(routes);

// Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER RUNNING"); // Log that the server is running
});
