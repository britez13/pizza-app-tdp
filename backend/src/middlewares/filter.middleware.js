const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const filterResponse = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization?.split(" ")[1];
    const decodedJWT = jwt.verify(
      bearerToken,
      process.env.ACCESS_SECRET_JWT,
      (err, decoded) => {
        if (err) {
          console.error("Invalid token:", err);
        } else {
          return decoded;
        }
      }
    );
    if(decodedJWT && (await User.findOne({ where: { id: decodedJWT.id, tipo: "staff" } }) ) ) {
        req.auth = true
    }
    else {
        req.auth = false
    }

    next()

  } catch (error) {
    res.status(500).json({message: `Error de server. ${error.message}`})
  }
};

module.exports = {
  filterResponse,
};
