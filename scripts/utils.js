function ensureAuthenticated(req, res, next) {
    return next(); // temporary
    
    if (req.isAuthenticated()) {
        return next();
    }
    
    req.flash('info', 'You must log in to view that.');
    res.render('login', {message: req.flash('info')});
}

module.exports = { ensureAuthenticated };