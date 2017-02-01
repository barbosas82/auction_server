var express       = require('express');

// =======================
// routes ================
// =======================
module.exports = function(app){

  var config = require('./config'); // get our config file

// API ROUTES -------------------

  //Admin method to add user, list users
  var users = require('./controllers/user');
  app.post('/useradd', users.add);
  app.get('/listusers', users.listAll);
  app.get('/listuser/:username', users.listOne);
  app.post('/authenticate', users.Auth); //Get New Token


  /**********************************************
  ******    METHODS FOR WANTLIST / ARTIST   *****
  **********************************************/
   var artists = require('./controllers/artists');

   app.post('/wantlist', artists.add );
   app.get('/wantlist', artists.findAll);
   app.put('/wantlist/:id', artists.update );
   app.delete('/wantlist/:id', artists.delete);

   /**********************************************
   ******    METHODS FOR TOKENS              *****
   **********************************************/

   var apiRoutes = express.Router();
   app.use('/api', apiRoutes);



}
