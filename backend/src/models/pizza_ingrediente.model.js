const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")
const { Pizza } = require("./pizza.model")
const { Ingrediente } = require("./ingrediente.model")

const PizzaIngrediente = sequelize.define('PizzaIngrediente', {
      PizzaId: {
      type: DataTypes.INTEGER,
      references: {
        model: Pizza,
        key: 'id'
      }
    },
    IngredienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: Ingrediente,
        key: 'id'
      }
    }
}, {
    timestamps: false
});

module.exports = {
    PizzaIngrediente
}
