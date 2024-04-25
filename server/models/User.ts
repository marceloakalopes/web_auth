import { Sequelize, DataTypes } from "sequelize";

const UserModel = (sequelize: Sequelize, DataTypes: any) => {
  const User = sequelize.define("User", {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return User;
};

export default UserModel;
