const mongoose = require('mongoose')
const Post = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', Post)