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
router.get('/', checkLogin, (req, res) => {
    res.render('index')
})

//đăng nhập bằng google
const passport = require('passport')
require('../passport')
router.use(passport.initialize());
router.use(passport.session());

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        var token = jwt.sign({ _id: req.user._id }, secret, { expiresIn: '30m' })
        res.cookie('token', token)
        res.redirect('/')
    }
)

//đăng xuất
router.get('/logout', (req, res) => {
    console.log("logout")
    res.json({ logout: true })
})

module.exports = router;