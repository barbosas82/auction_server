var express        = require('express');
var apiRoutes      = express.Router();
var users          = require('./controllers/user');
var artists        = require('./controllers/artists');
var auctions       = require('./controllers/auctions');
var jwt            = require('jsonwebtoken');
var path           = require('path');

module.exports = function(app){

  var config = require('./config'); // get our config file

  function validateUser(req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', '*')
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          //console.log(decoded);
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          //console.log(decoded);
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
  };

  /**********************************************
  ******           DEFAULT MESSAGES         *****
  **********************************************/
  // app.get('/', function(req, res) {
  //     res.send('Hello! The API is at http://localhost:' + port + '/api');
  // });


  app.use('/', express.static(path.join(__dirname, 'public_html')));
  apiRoutes.use('/private', express.static(path.join(__dirname, 'private_html')));



  apiRoutes.get('/', function(req, res) {
       res.json({ message: 'Welcome to the coolest API on earth!' });
  });

   /**********************************************
   ******          METHODS FOR TOKENS        *****
   **********************************************/
   app.post('/authenticate', users.Auth); //Get New Token

   // route middleware to verify a token
    apiRoutes.use(validateUser(req, res, next));

    //apiRoutes.use('/private', express.static('./private_html'));


    /**********************************************
    ******            USER METHODS            *****
    **********************************************/
    apiRoutes.post('/useradd', users.add);
    apiRoutes.get('/listusers', users.listAll);
    apiRoutes.get('/listuser/:username', users.listOne);

    /**********************************************
    ******    METHODS FOR WANTLIST / ARTIST   *****
    **********************************************/
     apiRoutes.post('/wantlist', artists.add );
     apiRoutes.get('/wantlist', artists.findAll);
     apiRoutes.put('/wantlist/:id', artists.update );
     apiRoutes.delete('/wantlist/:id', artists.delete);

     /**********************************************
     ******       METHODS FOR AUCTIONS         *****
     **********************************************/
      apiRoutes.post('/auction', auctions.add );
      apiRoutes.get('/auction', auctions.listAll);
      apiRoutes.put('/auction/:id', auctions.update );
      apiRoutes.delete('/auction/:id', auctions.delete);

     app.use('/api', apiRoutes);

}
