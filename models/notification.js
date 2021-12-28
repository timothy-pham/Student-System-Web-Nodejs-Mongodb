const mongoose = require('mongoose')
const category = require('./category')
const Notification = new mongoose.Schema({
    notification: {
        type: String,
    },
    createDate: {
        type: String,
        default: new Date().toLocaleString()
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