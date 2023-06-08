const { where } = require("sequelize")
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
    const { id } = req.params
    const { nombre, categoria } = req.body
    try {
        await Ingrediente.update({ nombre, categoria }, {
            where: {
                id
            }
        })
        const updatedIngrediente = await Ingrediente.findByPk(id)
        res.status(200).json(updatedIngrediente)
    } catch (e) {
        res.status(500).json({ message: `Error de server. ${e.message}`})
    }    
}

const deleteIngrediente = async(req, res) => {
    const { id } = req.params
    try {
        await Ingrediente.destroy( {
            where: {
                id
            }
        })
        res.sendStatus(204)
    } catch (e) {
        res.status(500).json({ message: `Error de server. ${e.message}`})
    }
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