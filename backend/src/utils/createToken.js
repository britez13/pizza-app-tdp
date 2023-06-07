const jwt = require("jsonwebtoken")


function createAccessToken(id) {
    return jwt.sign({id}, process.env.ACCESS_SECRET_JWT, {
        expiresIn: "6h"
    })
}

function createRefreshToken(id) {
    return jwt.sign({id}, process.env.REFRESH_SECRET_JWT, {
        expiresIn: "6d"
    })
}

module.exports = {
    createAccessToken,
    createRefreshToken
}