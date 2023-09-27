const { Sequelize } = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize(process.env.DATABASE, process.env.LOGIN, process.env.PASSWORD,{
    host: process.env.HOST_URL,
    dialect: 'mysql',  
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
     }}
});

module.exports = sequelize;