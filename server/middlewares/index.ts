import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Middleware to handle errors
 * @param {Error} err 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {void} - Responds with the error message or moves to the next middleware
 */
export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);

    const responseBody = {
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    };

    console.error("Error: ", responseBody);
    res.json(responseBody);
}

/**
 * Middleware to authenticate the JWT token
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {void} - Proceeds to the next middleware or controller
 */
export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      const token = req.cookies.__jwt; // Get the session ID from the cookie
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string); // Verify the JWT token
  
      if (decoded) {
        next(); // Proceed to the next middleware or controller
      } else {
        res.status(401).json({ isAuthenticated: false }); // Respond with failure
      }
    } catch (error) {
      res.status(401).json({ isAuthenticated: false }); // Respond with failure
    }
  };