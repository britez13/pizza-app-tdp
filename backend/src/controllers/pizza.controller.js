const sequelize = require("../config/db")
const { Pizza } = require("../models/pizza.model");
const { PizzaIngrediente } = require("../models/pizza_ingrediente.model");
const { Ingrediente } = require("../models/ingrediente.model");
const { param } = require("../routes/ingrediente.routes");
// const sequelize = require("sequelize");

async function getPizzas(req, res) {
  const [allPizzas] = await sequelize.query(
    'SELECT p."id", p."nombre", p."precio", p."estado", COUNT(pi."PizzaId") :: INTEGER AS cantidad FROM "Pizzas" AS p LEFT JOIN "PizzaIngredientes" AS pi ON p."id" = pi."PizzaId" GROUP BY p."id" ORDER BY p."id";'
  );

  res.json(allPizzas);
}

async function createPizza(req, res) {
  const { nombre, precio, estado } = req.body;

  try {
    const newPizza = await Pizza.create({ nombre, precio, estado });
    res.json(newPizza);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
}

async function updatePizza(req, res) {
  res.send("pizza updated");
}

async function deletePizza(req, res) {
  res.send("pizza deleted");
}

async function getPizza(req, res) {
    const { id } = req.params;
    
    try {
        const pizza = await Pizza.findAll({ where: { id }, include: Ingrediente });
        res.json(pizza)
    } catch (error) {
      res.send(error)  
    }
 

}

module.exports = {
  getPizzas,
  createPizza,
  updatePizza,
  deletePizza,
  getPizza,
};
