var express        = require('express');
var apiRoutes      = express.Router();
var prvRoutes      = express.Router();
var users          = require('./controllers/user');
var artists        = require('./controllers/artists');
var auctions       = require('./controllers/auctions');
var scraper        = require('./controllers/scraper');
var jwt            = require('jsonwebtoken');
var path           = require('path');
var cookieParser   = require('cookie-parser');

module.exports = function(app){
  app.use(cookieParser());
  var config = require('./config'); // get our config file
  var url = 'http://bid2.doismeios.pt:8080';

  function validateUser(req, res, next) {
     //res.setHeader('Access-Control-Allow-Origin', '*')
    // check header or url parameters or post parameters for token

    //console.log("Cookie: " + req.cookies['x-access-token']);
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['x-access-token'];

    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          //console.log(decoded);
          //return res.json({ success: false, message: 'Failed to authenticate token.' });
          res.set('Content-Type', 'text/html');
          res.status(401).send('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/"></head></html>');
        } else {
          // if everything is good, save to request for use in other routes
          //console.log(decoded);
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // if there is no token
      // redirect to login page
      res.set('Content-Type', 'text/html');
      res.status(401).send('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/"></head></html>');

      // return res.status(403).send({
      //     success: false,
      //     message: 'No token provided.'
      // });
    }
  };

  function setCacheHeaders(req, res, next) {
    res.setHeader('Cache-Control', 'max-age=604801');
    next();
}

  /**********************************************
  ******           DEFAULT MESSAGES         *****
  **********************************************/
  app.use(setCacheHeaders);

  //public auth page
  app.use('/', express.static(path.join(__dirname, 'public_html')));

  //private pages
  prvRoutes.use(validateUser);

  prvRoutes.use('/private', express.static(path.join(__dirname, 'private_html')));

  apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
  });

  /**********************************************
  ******          METHODS FOR TOKENS        *****
  **********************************************/
  app.post('/authenticate', users.Auth); //Get New Token

  // route middleware to verify a token
  apiRoutes.use(validateUser);


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

    /**********************************************
    ******       METHODS FOR SCRAPING         *****
    **********************************************/
	
    apiRoutes.post('/scrape', scraper.add);
	
    app.use('/api', apiRoutes);
    app.use(prvRoutes);
    /**********************************************
    ******       Error Handling               *****
    **********************************************/
    app.get('*', function(req, res){
      res.set('Content-Type', 'text/html');
      res.status(404).send('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/404.html"></head></html>');
    })

}
