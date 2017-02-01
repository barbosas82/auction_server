var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var ArtistSchema = new Schema({
  "_id" : Number,
  "name" : String,
}, {timestamps: true});

ArtistSchema.plugin(autoIncrement.plugin, 'Artist');

mongoose.model('Artist', ArtistSchema);
