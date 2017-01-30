var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt  = require('jsonwebtoken'),
    config = require('./config');


exports.add = function(req, res){
  var username = req.body.username;

  User.findOne({"username": username}, function(err, exists){
      if (exists){
        return res.send("User " + username + " already exists.");
      }else{
        User.create(req.body, function (err, usr) {
                if (err) return console.log(err);
                return res.send("User " + username + " created with id " + usr._id + ".");
        });
      }
  });
};

exports.listAll = function(req, res){
  User.find({}, function(req, result){
    return res.send(result);
  });
};

exports.listOne = function(req, res){
  User.find({"username":req.params.username}, function(req, result){
    return res.send(result);
  });
};

exports.Auth = function(req, res){
  var username = req.body.username;

   User.find({"username": username}, function (err, user){

     //res.send("Username: " + username);

     if(err) throw err;

     if (!user) {
       res.json({ success: false, message: 'Authentication failed. User not found. ' + username});
     } else if (user) {

         // check if password matches
         if (user.password != req.body.password) {
           res.json({ success: false, message: 'Authentication failed. Wrong password.' });
         } else {
           // if user is found and password is right
           // create a token
           var token = jwt.sign(user, config.secret, {
             expiresInMinutes: config.security.tokenlife
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


};
