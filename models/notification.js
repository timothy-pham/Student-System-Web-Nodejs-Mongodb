const mongoose = require('mongoose')
const category = require('./category')
const Notification = new mongoose.Schema({
    notification: {
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
    falcuty: {
        type: String,
    },
    title: {
        type: String,
    },
    user: {
        type: String,
    },
    category: [{
        type: String,
    }]
})

//mongoose.model('Notification', Notification).create({ notification: "TEST" })

module.exports = mongoose.model('Notification', Notification)