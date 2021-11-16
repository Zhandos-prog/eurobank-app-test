import Sequelize from "sequelize";
import dotenv from 'dotenv'
dotenv.config();

const db_connect = new Sequelize (
    process.env.DB_DATABASE,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
            dialect: "mysql",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
        }
)

export default db_connect;
