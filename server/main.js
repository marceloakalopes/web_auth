// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");

// Apply middleware
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(bodyParser.json()); // Parse JSON bodies (as sent by API clients)

// Set up database connection and models
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./config/index")(Sequelize); // Initialize Sequelize with configuration from config/index.js
const User = require("./models/User")(sequelize, DataTypes); // Import the User model

// Define a simple route to check API status
app.get("/api", (req, res) => {
  res.json({ name: "marcelo" }); // Send response as JSON
});

// Handle user registration
app.post("/api/auth", async (req, res) => {
  try {
    const key1 = req.body.key1; // Assume key1 is the username
    const key2 = req.body.key2; // Assume key2 is the password

    const hash = await bcrypt.hash(key2, 12); // Hash the password

    await sequelize.sync().then(() => {
      User.create({
        // Create a new user record in the database
        Username: key1,
        Password: hash,
      });
    });

    res
      .status(200)
      .json({ success: true, message: "Data inserted successfully" }); // Respond with success
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" }); // Handle errors
  }
});

// Handle user login
app.post("/api/login", async (req, res) => {
  try {
    const key1 = req.body.key1; // Username
    const key2 = req.body.key2; // Password

    await sequelize.sync().then(() => {
      User.findOne({ where: { Username: key1 } }).then(
        // Find the user by username
        async (user) => {
          if (user) {
            const { UserId, Username, Password } = user.dataValues;

            const match = await bcrypt.compare(key2, Password); // Compare the hashed passwords

            if (!match) {
              // If the password does not match
              res.status(500).json({ success: false, message: "Not found" });
            } else if (match) {
              // If the password matches
              res
                .status(200)
                .json({ success: true, cred: { UserId, Username } }); // Return the user's credentials
            }
          } else {
            res.status(500).json({ success: false, message: "Not found" }); // User not found
          }
        }
      );
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" }); // Handle errors
  }
});

// Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER RUNNING"); // Log that the server is running
});
