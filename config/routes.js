/**
 * New node file
 */
var users = require('../app/controllers/users');
var site = require('../app/controllers/site');
var uploader = require('../app/controllers/uploader');
var auth = require('./middlewares/authorization');

module.exports = function (app, passport) {
	
  //========================
  // Site Routes
  // =======================
  app.get("/" , site.home);
  app.get("/gallery", site.gallery);
  app.get("/contact", site.contact);
  app.post("/contact", site.sendQuery);
  //========================
  // 		User Routes    
  //========================
  app.get("/login", users.login);
  app.get("/signup", users.signup);
  app.get("/users/profile", users.needUser);
  app.get("/logout", users.logout); 
  app.post("/signup", passport.authenticate('local-signup', {
      successRedirect : '/users/profile', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));
  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/users/profile', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));
  //=====================
  // Control Panel Routes
  //======================
  app.get("/imagepanel" , uploader.displayPanel); 
  app.post("/imagepanel" , uploader.upload);
  app.post("/removeImage" , uploader.remove);

  //================
  // Error Handling
  //================
  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
    	return next();
      }
      console.error(err.stack);
      // error page
      res.status(500).render('errors/notFound', { error: err.stack });
    });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('errors/notFound', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });

}


