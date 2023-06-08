const { Router } = require("express")
const { getPizzas, createPizza, updatePizza, deletePizza, getPizza } = require("../controllers/pizza.controller")
const { protect } = require("../middlewares/protect.middleware")
const { filterResponse } = require("../middlewares/filter.middleware")


const router = Router()

router.get("/pizzas", filterResponse, getPizzas)
router.post("/pizzas", protect, createPizza)
router.put("/pizzas/:id", protect, updatePizza)
router.delete("/pizzas/:id", protect, deletePizza)
router.get("/pizzas/:id", getPizza)


module.exports = router