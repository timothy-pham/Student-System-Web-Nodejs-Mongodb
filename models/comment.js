const mongoose = require('mongoose')

const Comment = new mongoose.Schema({
    comment: {
        type: String,
    },
    createTime: {
        type: String,
        default: new Date().toLocaleString()
    },
    createAt: {
        type: String,
        default: Date.now()
    },
    fullname: {
        type: String
    },
    user: {
        type: String,
    },
    postId: {
        type: String,
    }
})

module.exports = mongoose.model('Comment', Comment)