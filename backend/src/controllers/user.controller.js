const bcrypt = require("bcrypt")
const { User } = require("../models/user.model")

async function register (req, res) {
    const { username, password } = req.body
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await User.create({ username, password: hashedPassword})
    console.log(newUser);
    res.send("register")
}

function login (req, res) {
    res.send("login")
}

function logout (req, res) {
    res.send("logout fucking user")
}

module.exports = {
    register,
    login,
    logout
}