var mongoose = require('mongoose'),
    Artist = mongoose.model('Artist');


/*
*       Returns all the Artists
*/

exports.findAll = function(req, res) {
  Artist.find({}, function(err, results) {
    return res.send(results);
  });
};

/*
*       Adds a new Artist
*/
exports.add = function(req, res) {
  var name = req.body.name;
  Artist.findOne({'name':name},function(err, exists) {

       if(!exists){
         Artist.create(req.body, function (err, arts) {
                 if (err) return console.log(err);
                 //return res.send("Artist " + name + " created with id " + arts._id + ".");
                 res.json({ success: true, message: "Artist " + name + " created with id " + arts._id + "."});
         });
       }else{
               //return res.send("Artist " + name + " already exists.");
               res.json({ success: false, message: "Artist " + name + " already exists."});
       }
 });
};

/*
*       Updates an existing rtist
*/

exports.update = function(req, res) {
  var id = req.params.id
  Artist.findOne({'_id':id},function(err, exists) {

        if(exists){
          Artist.update({"_id":id}, req.body, function (err, numberAffected) {
                  if (err) return console.log(err);
                  //return res.send("Artist " + id + " updated.");
                  res.json({ success: false, message: "Artist " + id + " updated."});
          });
        }else{
                //return res.send("Artist " + name + " doesn\'t exist.");
                res.json({ success: false, message: "Artist " + name + " doesn\'t exist."});
        }
  });
};

/*
*       Delete an existing Artist
*/
exports.delete = function(req, res){
  var id = req.params.id;
  Artist.findOne({'_id':id},function(err, exists) {
        if(!exists){
                //return res.send('Artist ' + id +  ' doesn\'t exist')
                res.json({ success: true, message: 'Artist ' + id +  ' doesn\'t exist'});
        }else{
          Artist.remove({'_id':id},function(result) {
                //return res.send("Artist " + id + " removed.");
                res.json({ success: false, message: "Artist " + id + " removed."});
          });
        }

  });
};
