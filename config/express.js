var express = require("express");
var session      = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash    = require('connect-flash');
var multer   = require('multer');
var methodOverride = require('method-override');
var expressValidator = require('express-validator');

/**
 * expose for now
 */
module.exports = function (app, passport) {

	//======================
	// Cookie Parser Config
	//=======================
	app.use(cookieParser()); // read cookies (needed for auth)

	//============================
	// Body Parser Configuration
	//=============================
	app.use(bodyParser.urlencoded({ extended: true })); //configure app to use bodyParser()
	app.use(bodyParser.json()); //this will let us get the data from a POST
	app.use(multer({dest: __dirname + '../../app/public/uploads'}));
	app.use(expressValidator());
	//======================
	// View Configuration
	//=======================
	app.set("views", __dirname + "/../app/views");
	app.set("view engine", "jade");
	app.use(express.static(__dirname + '/../app/public/'));
	
	//=====================
	// Passport setup
	//=====================
	require('../config/passport')(passport);
	app.use(session({ secret: 'ilovescotchscotchyscotchscotch',
					  resave: true,
					  saveUninitialized: true
	})); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

};