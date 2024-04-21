module.exports = (Sequelize: any) => {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      dialect: "mssql",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    }
  );

  return sequelize;
};
