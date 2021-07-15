var LocalStragegy = require('passport-local').Strategy;
var User = require('../models/userModel')
var bcrypt = require('bcryptjs')

module.exports = function(passport) {
    passport.use(new LocalStragegy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(username, password, done) {

        User.findOne({ email: username }, function(err, user) {
            if (err)
                console.log(err);
            if (!user) {
                return done(null, false, { message: 'Không tìm thấy!' })
            }

            bcrypt.compare(password, user.password, function(err, isMatch) {
                if (err) console.log(err)
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Mật khẩu sai!' })
                }
            })
        })
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })
}