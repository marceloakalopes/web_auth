// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const router = require("express").Router();
import bcrypt from "bcrypt";
import express, { Request, Response, NextFunction } from "express";
// Set up database connection and models
import { Sequelize, DataTypes } from "sequelize";
const sequelize = require("../config/database")(Sequelize); // Initialize Sequelize with configuration from config/index.js
const User = require("../models/User")(sequelize, DataTypes); // Import the User model
const Session = require("../models/Session")(sequelize, DataTypes); // Import the Session model

// Define a simple route to check API status
router.get("/api", (req: Request, res: Response) => {
  res.json({ author: "Marcelo" }); // Send response as JSON
});

const setCookies = (req: Request, res: Response, next: NextFunction) => {
  var cookie = req.cookies.sid;
  console.log("cookie:", cookie);

  if (cookie === undefined) {
    res.cookie("sid", "12345", {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  } else {
    console.log("cookie exists", cookie);
  }
  next();
};

router.get("/cookies", setCookies, (req: Request, res: Response) => {
  res.send("<h1>cookies</h1>");
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

interface User {
  UserId: number;
  Username: string;
  Password: string;
}

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

              const hashSid = await bcrypt.hash(
                `${process.env.HASH_FUNCTION}${Username}${process.env.SESSION_SECRET}`,
                10
              ); // Hash the session ID

              // Create a new session record in the database
              try {
                await Session.create({
                  sid: hashSid,
                  userId: UserId,
                  data: "session",
                });
              } catch (error) {
                console.error("Error:", error);
                res
                  .status(500)
                  .json({ success: false, message: "Internal server error" }); // Handle errors
              }

              // Set the session cookie
              res.cookie("sid", hashSid, {
                expires: new Date(Date.now() + 86400000 * 7), // Set the expiry date to 7 days
                httpOnly: true,
                secure: true,
                sameSite: "lax",
              });

              res.cookie("userId", UserId, {
                expires: new Date(Date.now() + 86400000 * 7), // Set the expiry date to 7 days
                httpOnly: true,
                secure: true,
                sameSite: "lax",
              });

              res.status(200).json({ success: true, username: Username }); // Respond with success
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

// Handle user session check
router.get("/api/validate", async (req: Request, res: Response) => {
  try {
    const sid = req.cookies.sid; // Get the session ID from the cookie
    const userId = req.cookies.userId;

    if (!sid) {
      res.json({ isAuthenticated: false });
    } else {
      Session.findOne({ where: { sid: sid, userId: userId } }).then(
        (session: any) => {
          if (session) {
            res.json({ isAuthenticated: true });
          } else {
            res.json({ isAuthenticated: false });
          }
        }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" }); // Handle errors
  }
});

// Handle user logout
router.get("/api/logout", (req: Request, res: Response) => {
  // Set 'sid' cookie's expiry to the past, effectively clearing it
  res.cookie("sid", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  res.cookie("userId", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
});

module.exports = router;
