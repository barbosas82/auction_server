// =======================
// routes ================
// =======================
module.exports = function(app){
  //Authentication libs


// API ROUTES -------------------

  //Admin method to add user, list users
  var users = require('./controllers/user');
  app.post('/api/useradd', users.add);
  app.get('/api/listusers', users.listAll)
  app.get('/api/listuser/:username', users.listOne)


  /**********************************************
  ******    METHODS FOR WANTLIST / ARTIST   *****
  **********************************************/
   var artists = require('./controllers/artists');

   app.post('/wantlist',
           artists.add
   );

   app.get('/wantlist',
           artists.findAll
   );

   app.put('/wantlist/:id',
           artists.update
   );

   app.delete('/wantlist/:id',
           artists.delete
   );

}
