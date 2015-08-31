"use strict";
var fs    = require('fs');
var Photo  = require('../models/photos');
var cloudinary = require('cloudinary');

exports.displayPanel = function (req, res) {
	isLoggedIn(req, res);
	Photo.find(function(err, photos) {
		if (err){
			console.error("finding error " + err);
			res.render("imageuploader/upload", {errors: err});
			return;
		}
		else if(photos !== undefined){
			var data = JSON.stringify(photos);
			res.render('imageuploader/uploader', {photos: data});
		}
		
	});	
};

exports.upload = function (req, res) {	
	var photo = new Photo();
	var image = req.body.image;
	
	if(image !== undefined){
		photo.image = image;
		photo.save(function(err , photos){
			if(!err){
				console.log(photos);
				return res.send(photos);
			}else{
				console.log("saving error \n " + err);
				res.render("imageuplader/upload", {errors: err});
				return;
			}
		});
	}	 
};

exports.remove = function (req, res) {	
	var public_id = req.params.id;
	Photo.findOneAndRemove({'_id' : public_id  }
		 ,function(err, photo) {
			 if(err){
				 console.log("Removing Error \n" +err);
				 res.render("imageuplader/upload", {errors: err});
			 }else{
			 	cloudinary.api.delete_resources(photo.image.public_id,
        		function(result){console.log(result);});
        		return res.send(photo); 
			 }   
	});
	//res.redirect('/imagepanel');
};