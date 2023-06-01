
const { Sequelize } = require("sequelize")

// Conexión con la base de datos 
const sequelize = new Sequelize("pizza-app", "postgres", "pass", {
    host: "localhost",
    dialect: "postgres",
});

module.exports = sequelize