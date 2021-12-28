const express = require('express')
const router = express.Router()
var cookieParser = require('cookie-parser')
const Users = require('../models/user')
router.use(cookieParser());

const jwt = require('jsonwebtoken');
var secret = 'tiendat'

function checkLogin(req, res, next) {
    try {
        var token = req.cookies.token;
        var decodeToken = jwt.verify(token, secret)
        Users.findOne({
            _id: decodeToken
        }).then(data => {
            if (data) {
                req.data = data
                next()
            }
        }).catch(err => {
            console.log(err)
        })
    } catch (error) {
        return res.redirect('/login')
    }
}

function checkManager(req, res, next) {
    var role = req.data.roles;
    if (role === "manager") {
        next()
    } else {
        res.redirect('/')
    }
}

router.get('/', checkLogin, checkManager, (req, res) => {
    res.render('manager')
})


const bcrypt = require('bcrypt');
const saltRounds = 10;
router.put('/changePassword', checkLogin, checkManager, (req, res) => {
    let password = req.body.password;

    bcrypt.hash(password, saltRounds, function (err, hash) {
        Users.updateOne({ _id: req.data._id }, { $set: { password: hash } }, (err, status) => {
            if (err) {
                console.log(err)
                return res.json({ success: false })
            }
            console.log("Change password success");
            return res.json({ success: true })
        })
    })

})
module.exports = router