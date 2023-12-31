// mongoose
const mongoose = require('mongoose')
// bcrypt
const bcrypt = require('bcrypt')
// validator
const userValidator = require('../utils/userValidator')

const Schema = mongoose.Schema

// user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

/* MODEL STATIC METHODS */

// login
userSchema.statics.login = async function (email, password) {
    // field required
    if(!email || !password) {
        throw Error("Please, fill all fields")
    }

    // find the user email
    const user = await this.findOne({email})
    if(!user) {
        throw Error("Incorrect email")
    }

    // match the credentials
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error("Invalid credentials !")
    }

    // if all goes well we should have the user successfully
    return user
}


// signup
userSchema.statics.signUp = async function (email, password, firstname, lastname) {
    // verify unique email
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error("Email already in use")
    }

    // field validation
    userValidator.validate(email, password, firstname, lastname)

    // password encryption with bcrypt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // DB saving
    const user = await this.create({ email, password: hash, firstname, lastname })

    return user
}


module.exports = mongoose.model('User', userSchema)