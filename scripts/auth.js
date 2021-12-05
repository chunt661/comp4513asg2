const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

const options = {
    usernameField: 'email',
    passwordField: 'password'
};

const strategy = new LocalStrategy(options, async (email, password, done) => {
    try {
        const user = await User.findOne({email: email});
        
        if (!user) {
            return done(null, false, {message: 'No user with that email exists.'});
        }
        
        const valid = await user.isPasswordValid(password);
        if (!valid) {
            return done(null, false, {message: 'Incorrect password.'});
        }
        
        return done(null, user, {message: 'Logged in successfully.'});
    } catch (error) {
        return done(error);
    }
});

passport.use('localLogin', strategy);
passport.serializeUser((user, done) => done(null, user.email));
passport.deserializeUser((email, done) => {
    User.findOne({email: email}, (err, user) => done(err, user));
});