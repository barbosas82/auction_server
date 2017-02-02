var mongoose = require('mongoose'),
    Auctions = mongoose.model('Auction');


exports.add = function(req, res){
  var _id = req.body._id;

  Auctions.findOne({"_id": _id}, function(err, exists){
      if (exists){
        res.json({ success: false, message: "Auction " + id + " already exist."});
      }else{
        Auctions.create(req.body, function (err, usr) {
                if (err) return console.log(err);
                res.json({ success: true, message: "Auction " + _id + " added to DB."});
        });
      }
  });
};

exports.listAll = function(req, res){
  Auctions.find({}, function(req, result){
    res.json({ success: true, message: result});
  });
};

exports.update = function(req, res) {
  var id = req.params.id
  Auctions.findOne({'_id':id},function(err, exists) {

        if(exists){
          Auctions.update({"_id":id}, req.body, function (err, numberAffected) {
                  if (err) return console.log(err);
                  res.json({ success: true, message: "Auction " + id + " updated."});
          });
        }else{
          res.json({ success: false, message: "Auction " + id + " doesn\'t exist."});
        }
  });
};


exports.delete = function(req, res){
  var id = req.params.id;
  Auctions.findOne({'_id':id},function(err, exists) {
        if(!exists){
                res.json({ success: false, message: "Auction " + id + " doesn\'t exist."});
        }else{
          Auctions.remove({'_id':id},function(result) {
                res.json({ success: true, message: "Auction " + id + " removed."});
          });
        }

  });
};
