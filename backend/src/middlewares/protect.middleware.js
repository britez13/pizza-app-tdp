const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const protect = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization?.split(" ")[1];
    const decodedJWT = jwt.verify(
      bearerToken,
      process.env.ACCESS_SECRET_JWT,
      (err, decoded) => {
        if (err) {
          console.error("Invalid token:", err);
        //   returres.status(400).json({ message: err.message });
        } else {
          console.log(decoded);
          return decoded;
        }
      }
    );
    if(decodedJWT && (await User.findOne({ where: { id: decodedJWT.id, tipo: "staff" } }) ) ) {
        next();
    }
    else {
        return res.status(400).json({ message: "No tiene los privilegios para acceder a este recurso" })
    }
  } catch (error) {
    res.status(500).json({message: `Error de server. ${error.message}`})
  }
};

module.exports = {
  protect,
};
