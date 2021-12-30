const mongoose = require('mongoose')
const category = require('./category')
const Notification = new mongoose.Schema({
    title: {
        type: String,
    },
    summary: {
        type: String,
    },
    detail: {
        type: String,
    },
    category: {
        type: String,
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
        type: String,
    },
    fullname: {
        type: String
    }
})

//mongoose.model('Notification', Notification).create({ notification: "TEST" })

module.exports = mongoose.model('Notification', Notification)