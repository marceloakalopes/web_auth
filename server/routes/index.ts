// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const router = require("express").Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
// Set up database connection and models
import { Sequelize, DataTypes } from "sequelize";
const sequelize = require("../config/database")(Sequelize); // Initialize Sequelize with configuration from config/index.js
const User = require("../models/User")(sequelize, DataTypes); // Import the User model
const JWT_SECRET = process.env.JWT_SECRET as string;

interface CustomRequest extends Request {
  user: any;
}

const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.__jwt; // Get the session ID from the cookie
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the JWT token

    if (decoded) {
      next(); // Proceed to the next middleware
    } else {
      res.status(401).json({ isAuthenticated: false }); // Respond with failure
    }
  } catch (error) {
    res.status(401).json({ isAuthenticated: false }); // Respond with failure
  }
};
// Define a simple route to check API status
router.get("/api", (res: Response) => {
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
router.post("/api/signup", async (req: Request, res: Response) => {
  try {
    const nameField = req.body.nameField; // Assume nameField is the full name
    const usernameField = req.body.usernameField; // Assume usernameField is the username
    const emailField = req.body.emailField; // Assume emailField is the email
    const passwordField = req.body.passwordField; // Assume passwordField is the password
    const confirmPasswordField = req.body.confirmPasswordField; // Assume confirmPasswordField is the confirm password

    if (passwordField !== confirmPasswordField) {
      res.status(500).json({
        success: false,
        message: "Passwords do not match. Try again.",
      }); // Passwords do not match
      return;
    } else if (passwordField === confirmPasswordField) {
      User.findOne({ where: { Username: usernameField } }).then((user: any) => {
        if (user) {
          res.status(500).json({
            success: false,
            message: "User already exists. Try again.",
          }); // User already exists
        } else if (!user) {
          (async () => {
            const hash = await bcrypt.hash(passwordField, 12); // Hash the password
            User.create({
              // Create a new user record in the database
              Name: nameField,
              Username: usernameField,
              Email: emailField,
              Password: hash,
            });

            res
              .status(200)
              .json({ success: true, message: "Data inserted successfully" }); // Respond with success
          })();
        }
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" }); // Handle errors
  }
});

interface User {
  UserId: number;
  Name: string;
  Username: string;
  Email: string;
  Password: string;
}

// Handle user login
router.post("/api/login", async (req: Request, res: Response) => {
  try {
    const usernameField = req.body.usernameField; // Username
    const passwordField = req.body.passwordField; // Password

    User.findOne({ where: { Username: usernameField } }).then(
      // Find the user by username
      async (user: any) => {
        if (user) {
          const { UserId, Name, Username, Email, Password } = user.dataValues;

          const match = await bcrypt.compare(passwordField, Password); // Compare the hashed passwords

          if (!match) {
            // If the password does not match
            res
              .status(401)
              .json({ success: false, message: "Incorrect Password" });
          } else if (match) {
            // If the password matches

            const accessToken = jwt.sign(Username, JWT_SECRET); // Create a JWT token

            res.cookie("__jwt", accessToken, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
              secure: true,
              sameSite: "lax",
            });

            return res.status(200).json({
              success: true,
              userData: {
                UserId,
                Name,
                Username,
                Email,
              },
            }); // Respond with success
          }
        } else {
          res.status(401).json({ success: false, message: "Not found" }); // User not found
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" }); // Handle errors
  }
});

// Handle user session check
router.get(
  "/api/validate",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      // Get the user ID from the cookie
      const userId = req.cookies.userId;

      // If the user is authenticated
      res.status(200).json({
        isAuthenticated: true,
        userId: userId,
      }); // Respond with success
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" }); // Handle errors
    }
  }
);

// Handle user logout
router.get("/api/logout", (req: Request, res: Response) => {
  // Set 'sid' cookie's expiry to the past, effectively clearing it
  res.cookie("__jwt", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
});

module.exports = router;
