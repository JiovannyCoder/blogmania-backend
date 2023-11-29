
/* METHODES */

// login
const login = async (req, res) => {
    res.status(200).json({message: 'Login the user here'})
}

// signUp
const signUp = async (req, res) => {
    res.status(200).json({message: 'Sign up the user here'})
}

module.exports = { login, signUp }
