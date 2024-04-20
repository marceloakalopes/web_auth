require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./config/index")(Sequelize);
const User = require("./models/User")(sequelize, DataTypes);

app.get("/api", (req, res) => {
  res.json({ name: "marcelo" });
});

// Register
app.post("/api/auth", (req, res) => {
  try {
    const key1 = req.body.key1;
    const key2 = req.body.key2;

    sequelize.sync().then(() => {
      User.create({
        Username: key1,
        Password: key2,
      });
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

    sequelize.sync().then(() => {
      User.findOne({ where: { Username: key1, Password: key2 } }).then(
        (user) => {
          if (user) {
            const { UserId, Username } = user.dataValues;
            res.status(200).json({ success: true, cred: { UserId, Username } });
          } else {
            res.status(500).json({ success: false, message: "Not found" });
          }
        }
      );
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER RUNNING");
});
