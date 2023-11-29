// mongoose
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// post schema
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)