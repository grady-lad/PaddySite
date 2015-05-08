
exports.login = function (req, res) {
	res.render("users/login", { message: req.flash('loginMessage') });
};

exports.signup = function (req, res) {
	res.render("users/signup", { message: req.flash('signupMessage') });
};

exports.needUser = function (req, res) {
	isLoggedIn(req, res);
	res.render('users/profile', {
         user : req.user // get the user out of session and pass to template
     });	
}

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


