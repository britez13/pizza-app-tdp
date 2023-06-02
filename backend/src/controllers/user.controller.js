const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
const { createToken } = require("../utils/createToken");

async function register(req, res) {
  try {
    const { username, password } = req.body;
    // Buscar si usuario ya existe
    const userExists = await User.findOne({ where: { username: username } });
    console.log(userExists);

    if (userExists) {
      return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, password: hashedPassword });
    const token = createToken(newUser.id);

    res.cookie("jwt", token, { httpOnly: true });
    res.send("register");
  } catch (error) {
    console.log(error.message);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Buscar si usuario existe
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).send("Credenciales incorrectos");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(user.id);
      res.cookie("jwt", token, { httpOnly: true });
      res.status(200).json(user);
    } else {
      res.status(400).send("Cred inc");
    }
  } catch (error) {
    console.log(error);
  }
}

function logout(req, res) {
  try {
    res.cookie("jwt", "", 1)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  register,
  login,
  logout,
};
