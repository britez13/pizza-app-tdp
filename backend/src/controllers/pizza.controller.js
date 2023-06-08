const sequelize = require("../config/db")
const { Pizza } = require("../models/pizza.model");
const { PizzaIngrediente } = require("../models/pizza_ingrediente.model");
const { Ingrediente } = require("../models/ingrediente.model");
const { param } = require("../routes/ingrediente.routes");

async function getPizzas(req, res) {
  try {
    if(req.auth) {
      const allPizzas = await Pizza.findAll({ include: Ingrediente })
      return res.status(200).json(allPizzas)
    }
  
    else {
      const query = `SELECT p."id", p."nombre", p."precio", p."estado", COUNT(pi."PizzaId")::INTEGER AS cantidad
      FROM "Pizzas" AS p
      LEFT JOIN "PizzaIngredientes" AS pi ON p."id" = pi."PizzaId"
      WHERE p."estado" = 'activo'
      GROUP BY p."id"
      ORDER BY p."id";`
      
      // const [allPizzas] = await sequelize.query(
      //   'SELECT p."id", p."nombre", p."precio", p."estado", COUNT(pi."PizzaId") :: INTEGER AS cantidad FROM "Pizzas" AS p LEFT JOIN "PizzaIngredientes" AS pi ON p."id" = pi."PizzaId" GROUP BY p."id" ORDER BY p."id";'
      // );
      
      const [allPizzas] = await sequelize.query(
        query
      );
      return res.json(allPizzas);
    }
  } catch (error) {
    res.status(500).json({message: `Error de server. ${error.message}`})
  }
  
  
}

async function createPizza(req, res) {
  const { nombre, precio, estado } = req.body;

  try {
    const newPizza = await Pizza.create({ nombre, precio, estado });
    res.json(newPizza);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: `Error de server. ${error.message}`})
  }
}

async function updatePizza(req, res) {
  const {id} = req.params
  console.log(id);
  typeof id
  const {nombre, precio, estado } = req.body
  try {
    await Pizza.update({nombre, precio, estado}, {where: {id}})
    const updatedPizza = await Pizza.findByPk(id);
    res.status(200).json(updatedPizza)
    
  } catch (error) {
    res.status(500).json({message: `Error de server. ${error.message}`})
  }
}

async function deletePizza(req, res) {
  const {id} = req.params
  try {
    await Pizza.destroy( {
      where: {
          id
      }
  })
  res.sendStatus(204)
  } catch (error) {
    res.status(500).json({message: `Error de server. ${error.message}`})
  }
}

async function getPizza(req, res) {
    const { id } = req.params;
    try {
        const pizza = await Pizza.findAll({ where: { id }, include: Ingrediente });
        res.status(200).json(pizza)
    } catch (error) {
      res.status(500).json({message: `Error de server. ${error.message}`})  
    }
}


module.exports = {
  getPizzas,
  createPizza,
  updatePizza,
  deletePizza,
  getPizza,
};
