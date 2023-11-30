// express
const express = require('express')

// user controller
const userController = require('../controllers/userController')

// middlewares
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

/* USER ROUTES */

// login route
router.post('/login', userController.login)

// signup route
router.post('/signup', userController.signUp)

// use the auth middleware for the routes down below
router.use(authMiddleware)

// current user info
router.post('/', userController.Info)

// current user posts
router.post('/posts', userController.UserPosts)

module.exports = router