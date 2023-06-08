const {PizzaIngrediente} = require("../models/pizza_ingrediente.model")

const addIngredientToPizza = async(req, res) => {
    const { pizza_id, ingrediente_id } = req.params
    try {
        const newIngredientToPizza = await PizzaIngrediente.create({ PizzaId: pizza_id, IngredienteId: ingrediente_id })
        res.status(201).json({newIngredientToPizza})
    } catch (error) {
        res.status(500).json({ message: `Error de server. ${error.message}` });
    }
}

const removeIngredientFromPizza = async(req, res) => {
    const { pizza_id, ingrediente_id } = req.params
    try {
        await PizzaIngrediente.destroy({ where: {PizzaId: pizza_id, IngredienteId: ingrediente_id} })
        res.sendStatus(202)
    } catch (error) {
        res.status(500).json({ message: `Error de server. ${error.message}` })
    }
}

module.exports = {
    addIngredientToPizza,
    removeIngredientFromPizza
}