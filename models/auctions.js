var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

// Auction
var AuctionSchema = new Schema({
    _id: {
        type: Number,
        unique: true,
        required: true
    },
    maxbid: {
        type: String,
        unique: true,
        required: true
    },
    currentbid: {
        type: String,
        required: false
    },
    enddate: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        required: false
    },
    status: {//Agendado, Em Curso, Terminado, Reiniciado
        type: String,
        required: true
    },
    paied: {
        type: String,
        required: false
    }
});


mongoose.model('Auction', AuctionSchema);
