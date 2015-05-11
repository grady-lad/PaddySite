var fs    = require('fs');
var Photo  = require('../models/photos');
var cloudinary = require('cloudinary');


exports.displayPanel = function (req, res) {
	console.log("hhehehe");
	Photo.find(function(err, photos) {
		console.log("we herererererer");
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
	Photo.findOneAndRemove({ 'image.public_id' : 'http://res.cloudinary.com/dzx1ez426/image/upload/v1431355780/tmxkohwenbaaxxuiy2bf.jpg'  }, function(err, photo) {
    if(err){
    	console.log(err);
    }
	cloudinary.api.delete_resources([''],
    function(result){console.log(result)});    
	});
	res.render('imageuploader/uploader');
}


