// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const router = require('express').Router();
import bcrypt from "bcrypt";
import express, {Request, Response} from "express";
// Set up database connection and models
import { Sequelize, DataTypes } from "sequelize";
const sequelize = require("../config/database")(Sequelize); // Initialize Sequelize with configuration from config/index.js
const User = require("../models/User")(sequelize, DataTypes); // Import the User model

// Define a simple route to check API status
router.get("/api", (req: Request, res: Response) => {
  res.json({ author: "Marcelo" }); // Send response as JSON
});

// Handle user registration
router.post("/api/auth", async (req: Request, res: Response) => {
  try {
    const usernameField = req.body.usernameField; // Assume usernameField is the username
    const passwordField = req.body.passwordField; // Assume passwordField is the password

    const hash = await bcrypt.hash(passwordField, 12); // Hash the password

    await sequelize.sync().then(() => {
      User.create({
        // Create a new user record in the database
        Username: usernameField,
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
router.post("/api/login", async (req: Request, res: Response) => {
  try {
    const usernameField = req.body.usernameField; // Username
    const passwordField = req.body.passwordField; // Password

    await sequelize.sync().then(() => {
      User.findOne({ where: { Username: usernameField } }).then(
        // Find the user by username
        async (user: any) => {
          if (user) {
            const { UserId, Username, Password } = user.dataValues;

            const match = await bcrypt.compare(passwordField, Password); // Compare the hashed passwords

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

module.exports = router;