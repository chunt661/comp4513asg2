require('dotenv').config();

const express = require('express');
const app = express();

const path = require('path');

const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const Play = require('./models/Play');
const User = require('./models/User');
const utils = require('./scripts/utils.js');

const router = require('./scripts/apiRouter.js');

require('./scripts/dbConnector.js').connect();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


/* --- MIDDLEWARE --- */

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

require('./scripts/auth.js');


/* React routes */

app.get('/', utils.ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

/* API routing */

router.registerPlaysList(app, Play);
router.registerPlayDetails(app, Play);
router.registerUserDetails(app, User);

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

// Helper route to retrieve the ID of the currently logged-in user. This is to
// allow user info to be fetched on the client side
app.get('/auth', (req, res) => {
    const id = req.user ? req.user.id : null;
    res.json({ userID: id });
});

app.use((req, res, next) => { res.status(404).send('Bad request.') });

const port = process.env.port;
app.listen(port, () => {
    console.log('listening on port ' + port);
});