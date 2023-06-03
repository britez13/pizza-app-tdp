const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")
const { Pizza } = require("./pizza.model")

const Ingrediente = sequelize.define("Ingrediente", {
    nombre: {
        type: DataTypes.STRING
    },
    categoria: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

// Ingrediente.belongsToMany(Pizza, { through: "Pizza_Ingredientes" })
// Ingrediente.belongsToMany(Pizza, { through: "Pizza_Ingredientes" })


module.exports = {
    Ingrediente
}

