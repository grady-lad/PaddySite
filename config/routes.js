"use strict";
var users = require('../app/controllers/users');
var site = require('../app/controllers/site');
var uploader = require('../app/controllers/uploader');


module.exports = function (app, passport) {
	
  //========================
  // Site Frontend Routes
  // =======================
  app.get("/" , site.home);
  app.get("/gallery", site.illustration);
  app.get("/contact", site.contact);
  app.post("/contact", site.sendQuery);
  app.get("/about", site.about);
  app.get("/blog", site.blog);
  app.get("/photo", site.illustration);
  //========================
  // 		User Routes    
  //========================
  app.get("/login", users.login);
  app.get("/signup", users.signup);
  app.get("/logout", users.logout); 
  
  app.post("/signup", passport.authenticate('local-signup', {
    successRedirect : '/imagepanel', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup if error
    failureFlash : true // allow flash messages
  }));
  
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/imagepanel', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if error
    failureFlash : true // allow flash messages
  }));
  
  //Authenticating user when using the image uploader
  function loggedIn(req, res, next) {
    if(req.user){
      next();
    } else {
      res.redirect('/login');
    }
  }
  //=====================
  // Control Panel Routes
  //======================
  app.get("/imagepanel", uploader.displayPanel); 
  app.post("/gallery" , uploader.upload);
  app.post("/updateCrops", uploader.cropDate);
  app.delete("/gallery/:id" , uploader.remove);

  //================
  // Error Handling
  //================
  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message && (err.message.indexOf('not found') || (err.message.indexOf('Cast to ObjectId failed')))) {
    	return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('errors/notFound', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('errors/notFound', {
      title: 'Not Found',
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};