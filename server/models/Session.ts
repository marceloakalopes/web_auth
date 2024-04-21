import { Sequelize } from "sequelize";

// Used for creating the User model in the database
module.exports = (sequelize:Sequelize, DataTypes:any) => {
  const Session = sequelize.define("Session", {
    sid: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
        },
    userId: {
        type: DataTypes.STRING,
    },
    data: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    });
  return Session;
};
