require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const sql = require("msnodesqlv8");

app.use(cors());
app.use(bodyParser.json());

// Import the connection string from the .env file
const config = process.env.CONNECTION_STRING;

app.get("/api", (req, res) => {
  res.json({ name: "marcelo" });
});

// Register
app.post("/api/auth", (req, res) => {
  try {
    const key1 = req.body.key1;
    const key2 = req.body.key2;

    const query = `INSERT INTO Users (Username, Password) VALUES ('${key1}', '${key2}')`;

    sql.query(config, query, (err) => {
      if (err) {
        console.error("Error:", err);
        res
          .status(500)
          .json({ success: false, message: "Internal server error one" });
      }
    });

    res
      .status(200)
      .json({ success: true, message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Login
app.post("/api/login", (req, res) => {
  try {
    const key1 = req.body.key1;
    const key2 = req.body.key2;

    const query = `SELECT UserId, Username FROM Users WHERE Username = '${key1}' AND Password = '${key2}'`;

    sql.query(config, query, (err, rows) => {
      if (err) {
        console.error("Error:", err);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else if (rows.length) {
        console.log(rows);
        res.status(200).json({ success: true, data: rows[0] });
      } else if (!rows.length) {
        res.status(500).json({ message: "Not found" });
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER RUNNING");
});
