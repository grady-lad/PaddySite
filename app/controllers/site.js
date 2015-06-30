var fs            = require('fs');
var nodemailer    = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var Photo 		  = require('../models/photos');


exports.home = function (req, res) {
  res.render("site/home");
}

exports.about = function (req, res) {
  res.render("site/about");
}

exports.blog = function (req, res) {
  res.render("site/blog");
}

exports.gallery = function (req, res) {
	
	Photo.find({}).sort({'image.created_at' : 1}).exec(function(err, photos) {
		if (err) return console.error(err);
		res.json(photos);
	});
    	
}

exports.illustration = function (req, res) {
	Photo.find({}).sort({'_id' : 1}).exec(function(err, photos) {
		if (err) return console.error(err);
		//res.json(photos);
		var data = JSON.stringify(photos);
		res.render("site/illustration" , {photos: data});
	})
}

exports.singleIllustration = function (req, res){
	res.render("site/photo");
}



exports.photo = function (req, res){
	
	var currentImageDate = "";
	currentImageDate = req.query.id;
	console.log("Our current Image date is " + currentImageDate);
	var images = [];
	Photo.find({}).sort({'image.created_at' : 1}).exec(function(err, photos){
		for(var i =0; i < photos.length; i++){
			console.log("hey hey");
			var loopImage = photos[i];
			if(currentImageDate == loopImage.image.created_at){
				console.log("Im in love with the coco");
				images.push(photos[i - 1]);
				images.push(photos[i]);
				images.push(photos[i + 1]);
				res.json(images);
			}			
		}			
	});	
}


exports.contact = function(req, res) {
	res.render("site/contact" , {message: '', errors: {} });


}

exports.sendQuery = function(req, res){
	
	req.assert('email', 'A valid email address').isEmail();
	var errors = req.validationErrors();
	//Nodemailer setup
	console.log(process.env.SMTP_PASS);
	var transporter = nodemailer.createTransport(smtpTransport({
		service: 'Gmail',
		debug: true,
		auth: { 
        	user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }));
    console.log('smtp configured');
    //Mail Options
    var mailOpts = {
        to: process.env.SMTP_USER,
        subject: 'Suggestions',
        text: 'email: ' + req.body.email + '\n' + '\n'+ 'Suggestion: ' + req.body.suggestion
    };
    
    if(!errors) {
    	transporter.sendMail(mailOpts, function (error, info){
    		if(error) {
    			console.log(error);
    		}
    		else {
    			console.log('Message sent: ' + info.response);
            }
    		transporter.close();
    		res.render('site/contact', {
    			title: 'title', 
    			message: 'Message sent, Thanks!', 
    			errors: {}
    		});
    	});
    }
    else {
    	res.render('site/contact',
                  {title: 'title',
                  message: '',
                  errors: errors});
    }
}




