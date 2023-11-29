// express
const express = require('express')

// post controller
const postController = require('../controllers/postController')
// auth middleware
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()


/* POST ROUTES */

// All posts
router.get('/', postController.Index)

// Single post
router.get('/:id', postController.Show)

// use the auth middleware for the routes down below
router.use(authMiddleware)

// Create a post
router.post('/', postController.Store)

// Delete a post
router.delete('/:id', postController.Destroy)

// Comment a post
router.put('/comment/:id', postController.CommentPost)

module.exports = router