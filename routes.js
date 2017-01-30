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
  app.get('/api/listuser:username', user.listOne)



}
