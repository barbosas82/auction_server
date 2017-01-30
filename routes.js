// =======================
// routes ================
// =======================
module.exports = function(app){

  var config = require('./config'); // get our config file


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

   app.post('/api/wantlist', artists.add );

   app.get('/api/wantlist', artists.findAll);

   app.put('/api/wantlist/:id', artists.update );

   app.delete('/api/wantlist/:id', artists.delete);

   /**********************************************
   ******    METHODS FOR TOKENS              *****
   **********************************************/
   var mongoose = require('mongoose'),
       User = mongoose.model('User'), // get our mongoose model
       jwt  = require('jsonwebtoken'); // used to create, sign, and verify tokens;

   app.post('/api/authenticate', function(req, res){
     var username = req.body.username;

      User.findOne({"username":req.body.username}, function (err, user){

        res.send("Username: " + username);

        if(err) throw err;

        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
              res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
              // if user is found and password is right
              // create a token
              var token = jwt.sign(user, app.get('superSecrets'), {
                expiresInMinutes: app.get('tokenlife')
              });

              // return the information including token as JSON
              res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
              });
            }
        }
      });
   });



}
