const { Ingrediente } = require("../models/ingrediente.model")

const getIngredientes = async(req, res) => {
    try {
        const ingredients = await Ingrediente.findAll()
        res.json(ingredients)
    } catch (error) {
        res.send(error.message)
    }
}

const createIngrediente = async(req, res) => {
    const { nombre, categoria } =  req.body 

    try {
        const newIngredient = await Ingrediente.create({ nombre, categoria })
        res.json(newIngredient)
    } catch (error) {
        res.send(error.message)
    }
}

const updateIngrediente = async(req, res) => {

}

const deleteIngrediente = async(req, res) => {

}

const getIngrediente = async(req, res) => {

}

module.exports = {
    getIngredientes,
    createIngrediente,
    updateIngrediente,
    deleteIngrediente,
    getIngrediente
}