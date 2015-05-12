var fs    = require('fs');
var Photo  = require('../models/photos');
var cloudinary = require('cloudinary');


exports.displayPanel = function (req, res) {
	isLoggedIn(req, res);
	Photo.find(function(err, photos) {
		if (err) return console.error(err);
		res.render('imageuploader/uploader', {photos: photos });
	});	
}

exports.upload = function (req, res) {	

	var photo = new Photo(req.body);
	// Get temp file path 
	var imageFile = req.files.image.path;
	// Upload file to Cloudinary
	cloudinary.uploader.upload(imageFile)
	.then(function(image){
		console.log('** file uploaded to Cloudinary service');
	    photo.image = image;
	    // Save photo with image metadata
	    photo.save();
	 })
	 .finally(function(){
		 //res.render('imageuploader/uploader');
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


