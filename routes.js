// =======================
// routes ================
// =======================
module.exports = function(app){
  //Authentication libs


// API ROUTES -------------------

  //Admin method to add user
  var users = require('./controllers/user');
  app.post('/useradd', users.add);
  app.get('/listusers' users.list)



}
