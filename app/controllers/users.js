"use strict";
exports.login = function (req, res) {
	res.render("users/login", { message: req.flash('loginMessage'), title: 'Login' });
};

exports.signup = function (req, res) {
	res.render("users/signup", { message: req.flash('signupMessage'), title: 'Signup' });
};

function isLoggedIn(req, res) {
    // if user is authenticated in the session, carry on 
    if (!req.isAuthenticated()){
    	// if they aren't redirect them to the home page
    	res.redirect('/');
    }
    
}

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};