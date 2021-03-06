"use strict";
var express 	 	 = require("express");
var session      	 = require('express-session');
var cookieParser 	 = require('cookie-parser');
var bodyParser 	 	 = require('body-parser');
var flash    	 	 = require('connect-flash');
var cloudinary 	 	 = require('cloudinary');
var multer   	     = require('multer');
var expressValidator = require('express-validator');
var path 			 = require('path');
/**
 * expose for now
 */
module.exports = function (app, passport) {

  //======================
  // Cookie Parser Config
  //=======================
  app.use(cookieParser()); // read cookies (needed for auth)

  //============================
  // MIddleware Configuration
  //=============================
  app.use(bodyParser.urlencoded({ extended: true })); //configure app to use bodyParser
  app.use(bodyParser.json()); //this will let us get the data from a POST
  app.use(multer());
  app.use(expressValidator());
  //=====================
  // Cloudinary Config
  //===================== 
  console.log(process.env.NODE_ENV);
  if (typeof(process.env.CLOUDINARY_URL) === 'undefined'){
		console.warn('!! cloudinary config is undefined !!');
		console.warn('export CLOUDINARY_URL or set dotenv file');
	}else{
		console.log('cloudinary config:');
		console.log(cloudinary.config());
	}
	
	//======================
	// View Configuration
	//=======================
	app.set("views", __dirname + "/../app/views");
	app.set("view engine", "jade");
	if(process.env.NODE_ENV === 'production'){
    	app.use(express.static(path.join(__dirname , '/../app/dist/')));
	}else{
		app.use(express.static(path.join(__dirname , '/../app/public/')));
	}
	//=====================
	// Passport setup
	//=====================
	require('../config/passport')(passport);
	app.use(session({ secret: process.env.SESSION_SECRET,
	  resave: true,
		saveUninitialized: true,
		maxAge: 60000
	})); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

};