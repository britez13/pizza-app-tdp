const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Pizza = sequelize.define("Pizza", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncremet: true
    },
    nombre: {
        type: DataTypes.STRING,
    },
    precio: {
        type: DataTypes.INTEGER
    },
    estado: {
        type: DataTypes.STRING
    }
})

module.exports = {
    Pizza
}