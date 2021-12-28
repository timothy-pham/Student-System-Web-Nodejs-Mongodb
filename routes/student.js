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

function checkStudent(req, res, next) {
    var role = req.data.roles;
    if (role === "student") {
        next()
    } else {
        res.redirect('/')
    }
}

router.get('/', checkLogin, checkStudent, (req, res) => {
    res.render('student', { student: req.data })
})

//update image
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == "image/bmp" || file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
            cb(null, true)
        } else {
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single('userPhoto');

const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
router.post('/', checkLogin, checkStudent, function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("A Multer error occurred when uploading.");
        } else if (err) {
            console.log("An unknown error occurred when uploading." + err);
        } else {
            let url = "/images/" + req.file.filename
            Users.updateOne({ _id: req.data._id }, { $set: { avatar: url } }, (err, status) => {
                if (err) {
                    console.log(err)
                    return res.render('student', { student: req.data, success: false })
                }
                // Delete the old file
                let path = "./public/" + req.data.avatar
                unlinkAsync(path)
                console.log("Change avatar success");
                return res.render('student', { student: { avatar: url }, success: true })
            })
        }
    });
});


router.put('/updateStudent', checkLogin, checkStudent, (req, res) => {
    let fullname = req.body.fullname;
    let sClass = req.body.class;
    let falcuty = req.body.falcuty;
    Users.updateOne({ _id: req.data._id }, { $set: { fullname: fullname, class: sClass, falcuty: falcuty } }, (err, status) => {
        if (err) {
            console.log(err)
            return res.json({ success: false })
        }
        console.log("Update student success");
        return res.json({ success: true })
    })
})
module.exports = router