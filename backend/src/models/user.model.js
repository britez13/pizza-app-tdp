const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    }, 
    password: {
        type: DataTypes.STRING
    },
    tipo: {
        type: DataTypes.STRING,
        defaultValue: "normal"
    }
})

module.exports = {
    User
}


