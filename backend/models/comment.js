const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    by: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    comment: {
        type: String
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
}, { timestamps: true })

const Comment = mongoose.Model('Comment', CommentSchema)
module.exports = Comment