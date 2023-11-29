// models
const Post = require('../models/postModel')


/* CONTROLLER METHODES */

// all posts
const Index = async (req, res) => {
    res.status(200).json({message: "Posts index"})
}

// single post
const Show = async (req, res) => {
    res.status(200).json({message: "Posts show"})
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