// =====================================
// get the packages we need ============
// =====================================
var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var morgan        = require('morgan');
var mongoose      = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var config = require('./config'); // get our config file




// =======================
// configuration =========
// =======================
var db = mongoose.connect(config.mongoose.uri);
autoIncrement.initialize(db);
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
app.set('superSecret', config.secret); // secret variable
app.set('tokenlife', config.security.tokenlife);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

var UserModel   = require('./models/user'); // get our mongoose model
var Artist   = require('./models/artists'); // get our mongoose model
require('./routes')(app); //get our routes

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
