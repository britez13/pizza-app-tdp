const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")
const { Ingrediente } = require("./ingrediente.model")
const { PizzaIngrediente } = require("./pizza_ingrediente.model")

const Pizza = sequelize.define("Pizza", {
    nombre: {
        type: DataTypes.STRING,
    },
    precio: {
        type: DataTypes.INTEGER
    },
    estado: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

Pizza.belongsToMany(Ingrediente, { through: PizzaIngrediente })
Ingrediente.belongsToMany(Pizza, { through: PizzaIngrediente })

module.exports = {
    Pizza
}