// express
const express = require('express')

// user controller
const postController = require('../controllers/postController')

const router = express.Router()

/* POST ROUTES */

// All posts
router.get('/', postController.Index)

// Single post
router.get('/:id', postController.Show)

// Create a post
router.post('/', postController.Store)

// Delete a post
router.delete('/:id', postController.Destroy)

module.exports = router