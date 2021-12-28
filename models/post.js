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
    createDate: {
        type: String,
        default: new Date().toLocaleString()
    },
    user: {
        type: String
    },
    fullname: {
        type: String
    }
})


module.exports = mongoose.model('Post', Post)