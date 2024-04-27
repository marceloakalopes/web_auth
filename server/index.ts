import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { errorHandler } from "./middlewares";

// Create an express application
const app = express();

// Apply middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
})); // Enable CORS (Cross-Origin Resource Sharing)
app.use(bodyParser.json()); // Parse JSON bodies (as sent by API clients)
app.use(cookieParser())

// Import all the routes from ./routes/index.js
app.use(routes);

// Error handling middleware
app.use(errorHandler);

// Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER RUNNING"); // Log that the server is running
});
