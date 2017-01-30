var mongoose = require('mongoose'),
    User = mongoose.model('User');


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
