const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  });

  const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };
  
  sequelize.sync().then(() => {

  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  module.exports = { sequelize: sequelize, testDbConnection };
  
  