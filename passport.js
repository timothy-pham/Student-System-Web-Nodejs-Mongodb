require('dotenv').config()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('./models/user')

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        if (profile._json.hd == 'student.tdtu.edu.vn') {
            Users.findOne({ username: profile.emails[0].value }, function (err, data) {
                if (!data) {
                    let student = new Users({
                        fullname: profile.displayName,
                        username: profile.emails[0].value,
                        avatar: profile._json['picture'],
                        roles: 'student'
                    })
                    student.save()
                    return done(null, student)
                }
                return done(null, data)
            })
        } else {
            err = 'Your email must be example@student.tdtu.edu.vn'
            return done(err)
        }
    }
));