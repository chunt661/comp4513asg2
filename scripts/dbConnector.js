const mongoose = require('mongoose');

const connect = () => {
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        dbName: 'assignment2'
    };
    
    mongoose.connect(process.env.MONGO_URL, options);
    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('connected to mongo');
    });
}

module.exports = { connect };