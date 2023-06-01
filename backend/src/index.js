const express = require("express");
const sequelize = require("./config/db");

// Inicializa express app
const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json())

// Rutas o endpoints
app.use(require("./routes/user.routes"));

// Escucha por las peticiones
app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log("Connection has been established successfully.");
    console.log("Server running on port", PORT);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
