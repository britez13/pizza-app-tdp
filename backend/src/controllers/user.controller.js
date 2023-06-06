const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
const { createToken } = require("../utils/createToken");

async function register(req, res) {
  const { username, password, tipo } = req.body;

  try {

    // Buscar si usuario ya existe
    const userExists = await User.findOne({ where: { username: username } });

    if (userExists) {
      return res.status(400).json("Usuario ya existe");
    }

    // Hashea contraseña
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, password: hashedPassword, tipo });

    // Crea JWT y responde
    const token = createToken(newUser.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 10000 * 60 * 60 });
    res.status(201).json({message: "Usuario creado exitosamente"});
  } catch (error) {
    res.status(500).json({message: "No se pudo crear usuario. Intente de nuevo"});
    console.log(error.message);
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {

    // console.log("Cookies:", req.cookies);

    // Buscar si usuario existe
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({message: "Credenciales incorrectos"});
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      // console.log(user.id);
      const token = createToken(user.id);
      console.log(token);
      res.cookie("jwt", token);
      res.status(200).json(user);
    } else {
      return res.status(400).json({message: "Credenciales incorrectos"});
    }
  } catch (error) {
    return res.status(500).json({message: "No se pudo loguear. Por favor, intente de nuevo"});
  }
}

function logout(req, res) {
  try {
    res.cookie("jwt", "", 1)
  } catch (error) {
    return res.status(500).json({message: "Error de server. Por favor, intente de nuevo"});
  }
}

module.exports = {
  register,
  login,
  logout,
};
