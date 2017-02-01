var express       = require('express');
var apiRoutes = express.Router();

// =======================
// routes ================
// =======================
module.exports = function(app){

  var config = require('./config'); // get our config file

// API ROUTES -------------------

  //Admin method to add user, list users
  var users = require('./controllers/user');
  apiRoutes.post('/useradd', users.add);
  apiRoutes.get('/listusers', users.listAll);
  apiRoutes.get('/listuser/:username', users.listOne);
  app.post('/authenticate', users.Auth); //Get New Token


  /**********************************************
  ******    METHODS FOR WANTLIST / ARTIST   *****
  **********************************************/
   var artists = require('./controllers/artists');

   apiRoutes.post('/wantlist', artists.add );
   apiRoutes.get('/wantlist', artists.findAll);
   apiRoutes.put('/wantlist/:id', artists.update );
   apiRoutes.delete('/wantlist/:id', artists.delete);

   /**********************************************
   ******    METHODS FOR TOKENS              *****
   **********************************************/


   apiRoutes.get('/', function(req, res) {
        res.json({ message: 'Welcome to the coolest API on earth!' });
   });
   app.use('/api', apiRoutes);



}
