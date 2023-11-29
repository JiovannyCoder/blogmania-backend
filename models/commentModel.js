// mongoose
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// post schema
const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)