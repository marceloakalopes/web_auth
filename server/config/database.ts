import { Sequelize } from "sequelize";

/*
  This function creates a new Sequelize instance with the provided configuration.
  The configuration is read from environment variables.
*/
const createSequelizeInstance = () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASS as string,
    {
      dialect: "mssql",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
    }
  );

  return sequelize;
};

export default createSequelizeInstance;