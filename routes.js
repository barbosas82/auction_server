// =======================
// routes ================
// =======================
module.exports = function(app){

  var config = require('./config'); // get our config file

// API ROUTES -------------------

  //Admin method to add user, list users
  var users = require('./controllers/user');
  app.post('/api/useradd', users.add);
  app.get('/api/listusers', users.listAll);
  app.get('/api/listuser/:username', users.listOne);
  app.post('/api/authenticate', users.Auth); //Get New Token


  /**********************************************
  ******    METHODS FOR WANTLIST / ARTIST   *****
  **********************************************/
   var artists = require('./controllers/artists');

   app.post('/api/wantlist', artists.add );
   app.get('/api/wantlist', artists.findAll);
   app.put('/api/wantlist/:id', artists.update );
   app.delete('/api/wantlist/:id', artists.delete);

   /**********************************************
   ******    METHODS FOR TOKENS              *****
   **********************************************/

}
