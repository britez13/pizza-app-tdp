const { Router } = require("express")
const { addIngredientToPizza, removeIngredientFromPizza } = require("../controllers/pizza_ingrediente.controller")
const { protect } = require("../middlewares/protect.middleware")

const router = Router()

router.post("/pizza/:pizza_id/ingrediente/:ingrediente_id", protect, addIngredientToPizza)
router.delete("/pizza/:pizza_id/ingrediente/:ingrediente_id", protect, removeIngredientFromPizza)


module.exports = router