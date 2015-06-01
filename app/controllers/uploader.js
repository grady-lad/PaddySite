var fs    = require('fs');
var Photo  = require('../models/photos');
var cloudinary = require('cloudinary');


exports.displayPanel = function (req, res) {
	//isLoggedIn(req, res);
	Photo.find(function(err, photos) {
		if (err) return console.error(err);
		res.render('imageuploader/uploader', {photos: photos });
	});	
}

exports.upload = function (req, res) {	
	console.log("we here?");
	var photo = new Photo(req.body);
	// Get temp file path 
	console.log("created photo variable but what it is for?");
	var imageFile = req.files.image.path;
	console.log("created the image file");
	// Upload file to Cloudinary
	cloudinary.uploader.upload(imageFile)
	.then(function(image){
		console.log('** file uploaded to Cloudinary service');
	    photo.image = image;
	    // Save photo with image metadata
	    console.log("saving");
	    photo.save();
	 })
	 .finally(function(){
		 //res.render('imageuploader/uploader');
		 console.log("rendering");
		 res.redirect('/imagepanel');
	 });	
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


