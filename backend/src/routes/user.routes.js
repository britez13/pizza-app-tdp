const { Router } = require('express')
const { register, login, refreshToken, logout } = require("../controllers/user.controller")

const router = Router()

router.post('/register', register)

router.post('/login', login)

router.get('/refresh-token', refreshToken)

router.get('/logout', logout)

module.exports = router