const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/createToken");

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
    const newUser = await User.create({
      username,
      password: hashedPassword,
      tipo,
    });

    // Crea JWT y responde
    const accessToken = createAccessToken(newUser.id);
    const refreshToken = createRefreshToken(newUser.id);

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    res
      .status(500)
      .json({ message: "No se pudo crear usuario. Intente de nuevo" });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Buscar si usuario existe
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectos" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = createAccessToken(user.id);
      const refreshToken = createRefreshToken(user.id);
      res.status(201).json({ accessToken, refreshToken });
    } else {
      return res.status(401).json({ message: "Credenciales incorrectos" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "No se pudo loguear. Por favor, intente de nuevo" });
    console.log(error);
  }
}

async function refreshToken(req, res) {
  try {
    // Obtiene refresh token a través de bearer token del request
    const refreshBearerToken = req.headers.authorization.split(" ")[1];
    const decodedJWT = jwt.decode(
      refreshBearerToken,
      process.env.REFRESH_SECRET_JWT
    );
    if (decodedJWT) {
      const accessToken = createAccessToken(decodedJWT.id);
      return res.json({accessToken});
    } 
    res.json({ message: "Token incorrecto o expirado" })
  } catch (error) {
    res.status(500).json({ "message": error.message })
  }
}

function logout(req, res) {
  try {
    res.cookie("jwt", "", 1);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error de server. Por favor, intente de nuevo" });
  }
}

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};
