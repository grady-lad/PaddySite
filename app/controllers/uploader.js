var fs   = require('fs');
var Image = require('../../app/models/image');

exports.displayPanel = function (req, res) {
	console.log("Hey ? what the fuck is going on?");
	res.render('imageuploader/uploader');	
}

exports.upload = function (req, res) {	
	console.log('FIRST TEST: ' + JSON.stringify(req.files));
	console.log('second TEST: ' +req.files.image.name);
	fs.readFile(req.files.image.path, function (err, data) {
		var imageName = req.files.image.name;
		if(!imageName){
			console.log("seems to be an error this file has not got a name");
			res.redirect("/");
			res.end();
		
		}else{
			var newimage = new Image();
			newimage.img.data = fs.readFileSync(req.files.image.path);
			newimage.img.name  = imageName;
			newimage.save(function (err, a) {
			      if (err){
			    	  console.log("There was an error saving the image")
					  res.redirect("/");
					  res.end();
			      }
			res.redirect("/gallery");
		  });	
		}		
	});
}

