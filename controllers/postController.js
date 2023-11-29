// mongoose
const mongoose = require('mongoose')
// models
const Post = require('../models/postModel')


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
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Id must be a valid id' })
    }
    
    const post = await Post.findOne({_id: id})

    if(!post) {
        return res.status(400).json({error: "Post not found"})
    }
    
    res.status(200).json(post)
}

// create a post
const Store = async (req, res) => {
    res.status(200).json({message: "Posts store"})
}

// delete a post
const Destroy = async (req, res) => {
    res.status(200).json({message: "Posts destroy"})
}

module.exports = {
    Index,
    Show,
    Store,
    Destroy
}