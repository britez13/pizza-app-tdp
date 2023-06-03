const { Router } = require("express")
const { getPizzas, createPizza, updatePizza, deletePizza, getPizza } = require("../controllers/pizza.controller")
const { protect } = require("../middlewares/protect.middleware")

const router = Router()

router.get("/pizzas", getPizzas)
router.post("/pizzas", createPizza)
router.put("/pizzas/:id", updatePizza)
router.delete("/pizzas/:id", deletePizza)
router.get("/pizzas/:id", getPizza)

module.exports = router