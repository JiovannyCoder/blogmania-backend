
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authMiddleware = async (req, res, next) => {
    // verify the request headers
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    // retrieve the token in the header
    const token = authorization.split(' ')[1]

    try {
        // verify token validity
        const { _id } = await jwt.verify(token, process.env.SECRET)

        // find the user
        const user = await User.findOne({_id}).select('_id')
        
        // attach the user in the request and go next
        req.user = user
        next()

    } catch (err) {
        console.log(err)
        return res.status(401).json({error: "Request unauthorized"})
    }
}

module.exports = authMiddleware