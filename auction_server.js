// =====================================
// get the packages we need ============
// =====================================
var express       = require('express');
var app           = express();
var app2          = express();
var bodyParser    = require('body-parser');
var morgan        = require('morgan');
var mongoose      = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var fs            = require('fs');
var config        = require('./config'); // get our config file




// =======================
// configuration =========
// =======================
var db = mongoose.connect(config.mongoose.uri);
autoIncrement.initialize(db);
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
app.set('secret', config.secret); // secret variable
app.set('tokenLife', config.security.tokenlife);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

require('./models/user'); // get our mongoose model
require('./models/artists'); // get our mongoose model
require('./models/auctions'); // get our mongoose model
require('./routes')(app); //get our routes


// http server
var port2 = 8081;
app2 = express.createServer(
     express.static(__dirname + '/html')
     );



// =======================
// start the servers ======
// =======================

app2.listen(port2, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port2}`)
})

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
