// express
const express = require('express')

// user controller
const userController = require('../controllers/userController')

const router = express.Router()

/* USER ROUTES */

// login route
router.post('/login', userController.login)

// signup route
router.post('/signup', userController.signUp)

module.exports = router