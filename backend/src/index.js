const express = require("express");
const cookieParser = require("cookie-parser")
const sequelize = require("./config/db");

// Inicializa express app
const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json())
app.use(cookieParser())


// Rutas o endpoints
app.use(require("./routes/user.routes"));
app.use(require("./routes/pizza.routes"))
app.use(require("./routes/ingrediente.routes"))

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
