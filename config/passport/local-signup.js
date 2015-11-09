"use strict";
var LocalStrategy = require('passport-local').Strategy;
var User            = require('../../app/models/users');

// =========================================================================
//               LOCAL SIGNUP USER FOR THE FIRST TIME                      =
// =========================================================================

// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
// In passport.js we pass the name "local-signup"
module.exports =  new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
},
    
  function(req, email, password, done) {
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {
      //Email Validation
    	if(!validateEmail(email)){
			  return done(null, false, req.flash('signupMessage', 'Please enter a valid email.'));
    	}
    	//Password length validation
    	if(password.length < 6){
			  return done(null, false, req.flash('signupMessage', 'Passwords must contain more than six characters.'));
    	}
    	// find a user whose email is the same as the forms email
    	// we are checking to see if the user trying to login already exists
    	User.findOne({ 'local.email' :  email }, function(err, user) {
    		// if there are any errors, return the error
    	  if(err){
    		  return done(err);
        }
    		// check to see if theres already a user with that email
    		if(user){
    		  return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
    		} else {
    		  // if there is no user with that email
    		  // create the user
    		  var newUser = new User();
    			// set the user's local credentials
    			newUser.local.email    = email;
    			newUser.local.password = newUser.generateHash(password);
    			// save the user
    			newUser.save(function(err) {
    			  if(err){
    				  throw err;
            }
    				return done(null, newUser);
    			});
    		}
    	});    
    });	
    function validateEmail(email) {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    	return re.test(email);
    }
});