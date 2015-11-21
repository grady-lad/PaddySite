"use strict";
var nodemailer    = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var Photo 		  = require('../models/photos');


exports.home = function (req, res) {
  res.render("site/home", {title: 'Home'});
};

exports.about = function (req, res) {
  res.render("site/about", {title: 'About'});
};

exports.blog = function (req, res) {
  res.render("site/blog", {title: 'Blog'});
};

exports.illustration = function (req, res) {
	/** Find our photos and order than by id**/
	Photo.find({}).sort({'_id' : 1}).exec(function(err, photos) {
		if (err){ return console.error(err);}
		//res.json(photos);
		var data = JSON.stringify(photos);
		res.render("site/illustration" , {title: 'Illustration', photos: data});
	});
};

exports.contact = function(req, res) {
	res.render("site/contact" , {message: '', errors: {}, title: 'Contact' });
};

/** Used to contact Paddy**/
exports.sendQuery = function(req, res){
	/** Request Validation**/
	req.checkBody('email', 'A valid email address').isEmail();
	req.checkBody('suggestion', 'An actual Message').notEmpty();
	var errors = req.validationErrors();
	/**Nodemailer setup**/
	var transporter = nodemailer.createTransport(smtpTransport({
		service: 'Gmail',
		debug: true,
		auth: { 
        	user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }));
    /**Mail options and mail construction**/
    var mailOpts = {
        to: process.env.SMTP_USER,
        subject: 'Suggestions',
        text: 'email: ' + req.body.email + '\n' + '\n' + req.body.suggestion
    };
    /** Senfing mail via nodemailer**/
    if(!errors) {
    	transporter.sendMail(mailOpts, function (error, info){
    		if(error) {
    			console.log(error);
    			//TODO: Displaying error to the user?
    		}
    		else {
    			console.log('Message sent: ' + info.response);
            }
    		/** Render with success message**/
    		transporter.close();
    		res.render('site/contact', {
    			title: 'Contact', 
    			message: 'Message sent, Thanks!', 
    			errors: {}
    		});
    	});
    }
    else {
    	/** Render with request errors (validation errors) **/
    	res.render('site/contact',
                  {title: 'Contact',
                  message: '',
                  errors: errors});
    }
};