const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String
    },
    roles: {
        type: String,
    },
    fullname: {
        type: String,
    },
    avatar: {
        type: String
    },
    falcuty: {
        type: String
    },
    class: {
        type: String
    },
    permission: [{
        type: String
    }]
})

//Tạo tài khoản admin
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const username = "admin"
// const password = "admin"
// bcrypt.hash(password, saltRounds, function (err, hash) {
//     mongoose.model('User', User).create({
//         username: username,
//         password: hash,
//         roles: "admin",
//         fullname: "Pham Tien Dat"
//     })
// });

module.exports = mongoose.model('User', User)