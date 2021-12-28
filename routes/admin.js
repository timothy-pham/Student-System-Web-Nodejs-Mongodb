const express = require('express')
const router = express.Router()
var cookieParser = require('cookie-parser')
const Users = require('../models/user')
const Categories = require('../models/category')
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

function checkAdmin(req, res, next) {
    var role = req.data.roles;
    if (role === "admin") {
        next()
    } else {
        res.redirect('/')
    }
}
router.get('/', checkLogin, checkAdmin, (req, res) => {
    Categories.find().then(data => {
        let category = [];
        for (let i = 0; i < data.length; i++) {
            category.push(data[i].category)
        }
        res.render('admin', { category: category })
    }).catch(err => {
        console.log(err)
        res.render('admin')
    })
})

const bcrypt = require('bcrypt');
const saltRounds = 10;
router.post('/register', checkLogin, checkAdmin, (req, res) => {
    let username = req.body.username;
    let permission = JSON.parse(req.body.permission);
    Users.findOne({ username: username }, (err, user) => {
        if (user) {
            console.log("Username already exists!")
            return res.json({ success: false })
        } else {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                let us = new Users({
                    fullname: req.body.fullname,
                    username: req.body.username,
                    password: hash,
                    permission: permission,
                    roles: "manager"
                })
                us.save((error, user) => {
                    if (error) {
                        console.log(error)
                        return res.json({ success: false, msg: error })
                    }
                    console.log('register success')
                    return res.json({ success: true })
                });
            });
        }
    })
})

module.exports = router