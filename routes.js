var express       = require('express');
var apiRoutes = express.Router();

// =======================
// routes ================
// =======================
module.exports = function(app){

  var config = require('./config'); // get our config file

  /**********************************************
  ******    DEFAULT MESSAGE                 *****
  **********************************************/
  apiRoutes.get('/', function(req, res) {
       res.json({ message: 'Welcome to the coolest API on earth!' });
  });

   /**********************************************
   ******    METHODS FOR TOKENS              *****
   **********************************************/
   app.post('/authenticate', users.Auth); //Get New Token

   // route middleware to verify a token
  apiRoutes.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });
    }
  });
  
  /**********************************************
  ******        USER METHODS                *****
  **********************************************/
  var users = require('./controllers/user');
  apiRoutes.post('/useradd', users.add);
  apiRoutes.get('/listusers', users.listAll);
  apiRoutes.get('/listuser/:username', users.listOne);

  /**********************************************
  ******    METHODS FOR WANTLIST / ARTIST   *****
  **********************************************/
   var artists = require('./controllers/artists');

   apiRoutes.post('/wantlist', artists.add );
   apiRoutes.get('/wantlist', artists.findAll);
   apiRoutes.put('/wantlist/:id', artists.update );
   apiRoutes.delete('/wantlist/:id', artists.delete);

   app.use('/api', apiRoutes);



}
