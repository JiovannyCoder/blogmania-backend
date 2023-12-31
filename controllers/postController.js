// mongoose
const mongoose = require('mongoose')

// models
const Post = require('../models/postModel')
const Comment = require('../models/commentModel')

// validator
const postValidator = require('../utils/postValidator')
const commentValidator = require('../utils/commentValidator')

/* CONTROLLER METHODES */

// all posts
const Index = async (req, res) => {
    const posts = await Post.find()
        .populate({ path: 'user', select: 'firstname lastname' })
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
        .populate([
            { path: 'user', select: 'firstname lastname' },
            {
                path: 'comments',
                select: 'content -_id user createdAt',
                populate: { path: 'user', select: 'firstname lastname' }
            },
        ])

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
        res.status(400).json({ error: err.message })
    }
}

// delete a post
const Destroy = async (req, res) => {
    const { id } = req.params
    // verify id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Post not found, invalid id" })
    }

    const post = await Post.findOneAndDelete({ _id: id })
    if (!post) {
        return res.status(404).json({ error: "Post not found" })
    }

    // delete in cascade the post comments
    await Comment.deleteMany({_id: {$in : post.comments}})

    res.status(200).json(post)
}

// comment a post
const CommentPost = async (req, res) => {
    const { id } = req.params
    const { content } = req.body

    // verify id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Post not found, invalid id" })
    }

    // find the post
    const post_exists = await Post.findOne({ _id: id })

    if (!post_exists) {
        return res.status(404).json({ error: "Post not found" })
    }

    try {
        // fields validation
        commentValidator.validate(content)

        // save the comment
        const comment = await Comment.create({
            content,
            user: req.user._id,
            post: post_exists._id
        })

        // update post comments
        const post = await Post.findOneAndUpdate({ _id: id }, {
            comments: [...post_exists.comments, comment._id]
        })

        const formatedComment = await Comment.findOne({_id: comment.id})
                                            .populate({ path: 'user', select: 'firstname lastname' })
                                            .select('-updatedAt -_id')
        // return the comment
        res.status(200).json(formatedComment)

    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}

module.exports = {
    Index,
    Show,
    Store,
    Destroy,
    CommentPost
}