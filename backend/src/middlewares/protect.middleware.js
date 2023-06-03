const jwt = require("jsonwebtoken")
const { User } = require("../models/user.model")

const protect = async(req, res, next) => {
    const jwtCookie = req.cookies.jwt
    if(jwtCookie) {
        const decodedJWT = jwt.verify(jwtCookie, "secret")
        if(decodedJWT) {
            const user = await User.findByPk(decodedJWT.id)
            req.isSuperUser = user.tipo === "superuser" ? true : false
        }
        
    }
    next()
}

module.exports = {
    protect
}
