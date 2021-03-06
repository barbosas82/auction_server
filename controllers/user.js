var mongoose = require('mongoose'),
    Users = mongoose.model('User'),
    jwt  = require('jsonwebtoken'),
    config = require('../config');


//Add new user
exports.add = function(req, res){
  var username = req.body.username;

  Users.findOne({"username": username}, function(err, exists){
      if (exists){
        res.json({ success: false, message: "User " + username + " already exists."});
      }else{
        Users.create(req.body, function (err, usr) {
                if (err) return console.log(err);
                return res.send("User " + username + " created with id " + usr._id + ".");
                res.json({ success: false, message: "User " + username + " created with id " + usr._id + "."});
        });
      }
  });
};

//List all users
exports.listAll = function(req, res){
  Users.find({}, function(req, result){
    res.json({ success: true, message: result});
  });
};

//List one user
exports.listOne = function(req, res){
  Users.find({"username":req.params.username}, function(req, user){
    if (!user){
      res.json({ success: false, message: 'User ' + username + " Doesn\'t exist."});
    }else{
      res.json({ success: true, message: user});
    }
  });
};

//Authenticate user
exports.Auth = function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  Users.findOne({"username": username}, function(err, user){
    if (!user){
      res.json({ success: false, message: 'Authentication failed. User not found. ' + username});
    }else if (user){
      //Check if password matches
      if (!user.checkPassword(password)) {//doesn't match
        res.json({ success: false, message: 'Authentication failed. Wrong password.'});
      }else{//match
        user.salt = "f3768a6fc92b0852a230c53b7c35b1111ac96748a88607545d3dd782b57f3c31";
        user.hashedPassword = "e8675dcdc1d72966f64a1c406d47b51a28c03cdd";
        var token = jwt.sign(user, req.app.get('secret'), {expiresIn: req.app.get('tokenLife')}  );
        res.json({success: true,  message: 'Enjoy your token!', token: token });
       }
    }
   });
};
