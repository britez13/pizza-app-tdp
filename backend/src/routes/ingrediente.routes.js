const { Router } = require("express");
const {
  getIngredientes,
  createIngrediente,
  updateIngrediente,
  deleteIngrediente,
  getIngrediente,
} = require("../controllers/ingrediente.controller");

const router = Router();

router.get("/ingredientes", getIngredientes);
router.post("/ingredientes", createIngrediente);
router.put("/ingredientes/:id", updateIngrediente);
router.delete("/ingredientes/:id", deleteIngrediente);
router.get("/ingredientes/:id", getIngrediente);

module.exports = router;
