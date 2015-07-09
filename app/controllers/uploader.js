var fs    = require('fs');
var Photo  = require('../models/photos');
var cloudinary = require('cloudinary');

exports.displayPanel = function (req, res) {
	//isLoggedIn(req, res);
	Photo.find(function(err, photos) {
		if (err){
			console.error("finding error " + err);
			res.render("imageuploader/upload", {errors: err});
			return;
		}
		else if(photos != undefined){
			var data = JSON.stringify(photos);
			res.render('imageuploader/uploader', {photos: data});
		}
		
	});	
}

exports.upload = function (req, res) {	

	var photo = new Photo();
	var image = req.body.image;
	photo.image = JSON.parse(image);
	photo.save(function(err){
		if(err){
			console.log("saving error \n " + err);
			res.render("imageuplader/upload", {errors: err});
			return;
		}
	});
	res.redirect('/imagepanel');	 
}

exports.remove = function (req, res) {	
	var public_id = req.body.imgId;
	Photo.findOneAndRemove({'image.public_id' : public_id  }
		 ,function(err, photo) {
			 if(err){
				 console.log("Removing Error \n" +err);
				 res.render("imageuplader/upload", {errors: err});
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


