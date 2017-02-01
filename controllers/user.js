var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt  = require('jsonwebtoken'),
    config = require('../config');


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
    return res.send(result instanceof User);
  });
};

exports.Auth = function(req, res){
  var username = req.body.username;

  User.find({"username": username}, function(err, user){
    return res.send(user instanceof User);
    if (!user){
      res.json({ success: false, message: 'Authentication failed. User not found. ' + username});
    }else if (user){
      //Check if password matches
      if (!user.checkPassword(username)) {//doesn't match
        res.json({ success: false, message: 'Authentication failed. Wrong password.'});
      }else{//match
        var token = jwt.sign(exists, req.app.get('superSecret'), {expiresIn: req.app.get('tokenLife')}  );
        res.json({success: true,  message: 'Enjoy your token!', token: token });
       }
    }
   });
};
