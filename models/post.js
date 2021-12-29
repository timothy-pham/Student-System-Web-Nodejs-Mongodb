const mongoose = require('mongoose')
const Post = new mongoose.Schema({
    caption: {
        type: String
    },
    image: {
        type: String
    },
    video: {
        type: String
    },
    createTime: {
        type: String,
        default: new Date().toLocaleString()
    },
    createAt: {
        type: String,
        default: new Date().getTime()
    },
    user: {
        type: String
    },
    fullname: {
        type: String
    }
})


module.exports = mongoose.model('Post', Post)