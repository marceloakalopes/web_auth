require("dotenv").config();

import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DataTypes } from "sequelize";
import createSequelizeInstance from "../config/database";
import createUserModel from "../models/User";
import { authenticateToken } from "../middlewares";

const router = Router();
const sequelize = createSequelizeInstance();
const User = createUserModel(sequelize, DataTypes);

// Test API
router.get("/api", (req: Request, res: Response) => {
  res.json({ author: "Marcelo" }); // Send response as JSON
});

interface User {
  UserId: number;
  Name: string;
  Username: string;
  Email: string;
  Password: string;
}

// Handle user registration
router.post("/api/signup", async (req: Request, res: Response) => {
  try {
    const nameField = req.body.nameField;
    const usernameField = req.body.usernameField;
    const emailField = req.body.emailField;
    const passwordField = req.body.passwordField;
    const confirmPasswordField = req.body.confirmPasswordField;

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
            const accessToken = jwt.sign(Username, process.env.JWT_SECRET as string); // Create a JWT token

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
router.get(
  "/api/logout",
  authenticateToken,
  async (req: Request, res: Response) => {
    res.cookie("__jwt", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  }
);

export default router;
