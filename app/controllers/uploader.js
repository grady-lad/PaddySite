var fs    = require('fs');
var Photo  = require('../models/photos');
var cloudinary = require('cloudinary');

exports.displayPanel = function (req, res) {
	//isLoggedIn(req, res);
	var cloudinary_cors = "http://" + req.headers.host + "/cloudinary_cors.html";
	Photo.find(function(err, photos) {
		if (err) return console.error(err);
		res.render('imageuploader/uploader', {photos: photos, cloudinary_cors:cloudinary_cors, cloudinary: cloudinary });
	});	
}

exports.upload = function (req, res) {	

	var photo = new Photo();
	var image = req.body.image;
	photo.image = JSON.parse(image);
	photo.save();
	//res.render('imageuploader/uploader');
	console.log("rendering");
	res.redirect('/imagepanel');
	 
}

exports.remove = function (req, res) {	
	var public_id = req.body.imgId
	Photo.findOneAndRemove({'image.public_id' : public_id  }
		 ,function(err, photo) {
			 if(err){
				 console.log(err);
			 }
	    cloudinary.api.delete_resources([''],
        function(result){console.log(result)});    
	});
	res.redirect('/imagepanel');
}

function isLoggedIn(req, res) {
    // if user is authenticated in the session, carry on 
    if (!req.isAuthenticated()){
    	// if they aren't redirect them to the home page
    	res.redirect('/');
    }
    
}


