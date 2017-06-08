var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

// Scrape
var ScrapeSchema = new Schema({
    _id: {
        type: Number,
        unique: true,
        required: true
    },
    maxbid: {
        type: String,
        unique: true,
        required: true
    }
});

mongoose.model('Scraper', ScrapeSchema);