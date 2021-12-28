const mongoose = require('mongoose')

const Comment = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    createDate: {
        type: String,
        default: new Date().toLocaleString()
    },
    user: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', Comment)