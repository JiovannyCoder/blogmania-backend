// model
const User = require('../models/userModel')
// JWT
const jwt = require('jsonwebtoken')

// jwt token generator
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}


/* CONTROLLER METHODES */

// login
const login = async (req, res) => {
    const {email, password} = req.body

    try {
        // signup the user
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id)

        // return the user email and his token
        res.status(200).json({email, token})

    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// signUp
const signUp = async (req, res) => {
    const {email, password, firstname, lastname} = req.body

    try {
        // signup the user
        const user = await User.signUp(email, password, firstname, lastname)

        // create token
        const token = createToken(user._id)

        // return the user email and his token
        res.status(200).json({email, token})

    } catch (err) {
        res.status(400).json({error: err.message})
    }
    
}

// user Info 
const Info = async (req, res) => {

    const user = await User.findOne({_id: req.user._id}).select('-password')

    if(!user) {
        return res.status(404).json({error: "User not found"})
    }

    res.status(200).json(user)
}

module.exports = { login, signUp, Info }
