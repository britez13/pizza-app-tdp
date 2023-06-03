const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const User = sequelize.define("User", {
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
}, {
    timestamps: false
  })

module.exports = {
    User
}


