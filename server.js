require('dotenv').config();

const express = require('express');
const app = express();

const path = require('path');

const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const User = require('./models/User');
const utils = require('./scripts/utils.js');

require('./scripts/dbConnector.js').connect();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


/* --- MIDDLEWARE --- */

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(cookieParser('oreo'));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

require('./scripts/auth.js');


/* Routes */

app.get('/', utils.ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

/* Login routing */

app.get('/login', (req, res) => {
    res.render('login.ejs', {message: req.flash('error')});
});

app.post('/login', async (req, res, next) => {
    passport.authenticate('localLogin', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

app.get('/logout', (req, res) => {
    req.logout();
    req.flash('info', 'You were logged out.');
    res.render('login', {message: req.flash('info')});
});


app.use((req, res, next) => { res.status(404).send('Bad request.') });

const port = process.env.port;
app.listen(port, () => {
    console.log('listening on port ' + port);
});