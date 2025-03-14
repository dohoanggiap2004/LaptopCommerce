const {Sequelize} = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect:
        process.env
            .DB_DIALECT,
        logging: false,
        dialectOptions: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        },
        define: {
            freezeTableName: true,
        },
        timezone: "+7:00",
    }
);

const connectionSequelize = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

const syncDatabase = async () => {
    try {
        await sequelize.sync({alter: true,});
        console.log("Models synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing models:", error);
    }
};

module.exports = {connectionSequelize, syncDatabase, sequelize};
