const jwt = require("jsonwebtoken")

const JWT_SECRET = "secret"

function createToken(id) {
    return jwt.sign({id}, JWT_SECRET, {
        expiresIn: "1h"
    })
}

module.exports = {
    createToken
}