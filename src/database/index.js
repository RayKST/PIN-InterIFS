import { Sequelize } from 'sequelize';
import 'dotenv/config'


const sequelize = new Sequelize(process.env.DATABASE, process.env.LOGIN, process.env.PASSWORD,{
    host: process.env.HOST_URL,
    dialect: 'mysql',  
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
     }}
});

export {sequelize};