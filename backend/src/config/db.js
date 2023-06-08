
const { Sequelize } = require("sequelize")

// Conexión con la base de datos 
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "postgres",
});

module.exports = sequelize