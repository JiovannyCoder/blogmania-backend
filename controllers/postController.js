// mongoose
const mongoose = require('mongoose')

// models
const Post = require('../models/postModel')
// post validator
const postValidator = require('../utils/postValidator')

/* CONTROLLER METHODES */

// all posts
const Index = async (req, res) => {
    const posts = await Post.find()
        .sort({ createdAt: -1 })

    res.status(200).json(posts)
}

// single post
const Show = async (req, res) => {
    const { id } = req.params

    // verify id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Id must be a valid id' })
    }

    const post = await Post.findOne({ _id: id })

    if (!post) {
        return res.status(400).json({ error: "Post not found" })
    }

    res.status(200).json(post)
}

// create a post
const Store = async (req, res) => {
    const { title, body } = req.body

    try {
        // validate the request
        postValidator.validate(title, body)

        // retrieve user id
        const user_id = req.user._id

        // save the post and return it
        const post = await Post.create({ title, body, user: user_id })
        res.status(200).json(post)

    } catch (err) {
        res.status(422).json({ error: err.message })
    }
}

// delete a post
const Destroy = async (req, res) => {
    const { id } = req.params
    // verify id format
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Post not found, invalid id"})
    }

    const post = await Post.findOneAndDelete({_id: id})
    if(!post) {
        return res.status(404).json({error: "Post not found"})
    }
    res.status(200).json(post)
}

module.exports = {
    Index,
    Show,
    Store,
    Destroy
}