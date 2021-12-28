const mongoose = require('mongoose')
const category = require('./category')
const Notification = new mongoose.Schema({
    notification: {
        type: String,
    },
    createDate: {
        type: Date,
        default: Date.now()
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

module.exports = mongoose.model('Notification', Notification)