const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const sequelize = require("./config/db");

// Inicializa express app
const app = express();
const PORT = 5000;

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())


// Rutas o endpoints
app.use(require("./routes/user.routes"));
app.use(require("./routes/pizza.routes"))
app.use(require("./routes/ingrediente.routes"))

app.get("/set-cookies", (req, res) => {
  res.cookie('testCookie', 'Hello Darkness!', { httpOnly: true});
  res.send('Cookie set successfully!');
})

app.get("/get-cookies", (req, res) => {
  console.log(req.cookies)
  res.send("ok ok ok")
})

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
