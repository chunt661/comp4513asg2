const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
    id: String,
    filename: String,
    title: String,
    likelyDate: String,
    genre: String,
    wiki: String,
    gutenberg: String,
    shakespeareOrg: String,
    synopsis: String,
    desc: String,
    playText: {
        title: String,
        short: String,
        persona: [{
            position: Number,
            player: String,
            desc: String
        }],
        acts: [{
            name: String,
            scenes: [{
                name: String,
                title: String,
                stageDirection: String,
                speeches: [{
                    speaker: String,
                    lines: [String]
                }]
            }]
        }]
    }
});

module.exports = mongoose.model('Play', playSchema);