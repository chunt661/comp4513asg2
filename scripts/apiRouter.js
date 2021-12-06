const utils = require('./utils');

/**
Registers a listener for requests for brief information on all plays.
*/
const registerPlaysList = (app, Play) => {
    // Fields to be returned
    const projection = {
        id: 1,
        filename: 1,
        title: 1,
        likelyDate: 1,
        genre: 1,
        synopsis: 1
    };
    
    app.get('/api/list', utils.ensureAuthenticated, (req, res) => {
        Play.find({}, projection, (err, data) => {
            res.set('Access-Control-Allow-Origin', '*');
            
            if (err) {
                res.json({message: 'Could not connect to plays collection.'});
            } else {
                res.json(data);
            }
        });
    });
};

/**
Registers a listener for requests for complete information on a given play.
*/
const registerPlayDetails = (app, Play) => {
    app.get('/api/play/:id', utils.ensureAuthenticated, (req, res) => {
        Play.find({id: req.params.id}, (err, data) => {
            res.set('Access-Control-Allow-Origin', '*');
            
            if (err) {
                res.json({message: 'Could not find the specified play.'})
            } else {
                res.json(data);
            }
        });
    });
};

/**
Registers a listener for requests for user details.
*/
const registerUserDetails = (app, User) => {
    // Fields to be returned
    const projection = {
        id: 1,
        details: 1,
        picture: 1,
        membership: 1,
        email: 1
    };
    
    app.get('/api/user/:id', utils.ensureAuthenticated, (req, res) => {
        User.find({id: req.params.id}, projection, (err, data) => {
            res.set('Access-Control-Allow-Origin', '*');
            
            if (err) {
                res.json({message: 'Could not find the specified user.'});
            } else {
                res.json(data);
            }
        });
    });
};

module.exports = {
    registerPlaysList,
    registerPlayDetails,
    registerUserDetails
};