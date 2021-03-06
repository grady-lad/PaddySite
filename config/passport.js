"use strict";
var localSignup = require('./passport/local-signup');
var localLogin  = require('./passport/local-login');
var User            = require('../app/models/users');

// expose this function to our app using module.exports
module.exports = function(passport) {
	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session
    
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
    
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
    
passport.use("local-signup" , localSignup);
passport.use("local-login", localLogin);

};
