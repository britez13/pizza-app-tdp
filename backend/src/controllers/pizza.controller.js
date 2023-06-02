const { Pizza } = require("../models/pizza.model")

async function getPizzas(req, res) {
    const allPizzas = await Pizza.findAll(); 
    res.send("your pizzas")
} 

async function createPizza(req, res) {
    const { nombre, precio, estado } = req.body

    try {
        const newPizza = await Pizza.create({ nombre, precio, estado })
    } catch (error) {
        console.log(error.message);
    }
    res.send("pizza created")
} 

async function updatePizza(req, res) {
    res.send("pizza updated")
} 

async function deletePizza(req, res) {
    res.send("pizza deleted")
} 

async function getPizza(req, res) {
    const { id } = req.params

    const pizza = await Pizza.findByPk({ where: {id} })
}

module.exports = {
    getPizzas,
    createPizza,
    updatePizza,
    deletePizza,
    getPizza
}
