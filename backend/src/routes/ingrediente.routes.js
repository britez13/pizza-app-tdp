const { Router } = require("express");
const {
  getIngredientes,
  createIngrediente,
  updateIngrediente,
  deleteIngrediente,
  getIngrediente,
} = require("../controllers/ingrediente.controller");
const { protect } = require("../middlewares/protect.middleware")

const router = Router();

router.get("/ingredientes", getIngredientes);
router.post("/ingredientes", protect, createIngrediente);
router.put("/ingredientes/:id", protect, updateIngrediente);
router.delete("/ingredientes/:id", protect, deleteIngrediente);
// router.get("/ingredientes/:id", getIngrediente);

module.exports = router;
