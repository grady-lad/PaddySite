var fs    = require('fs');

exports.displayPanel = function (req, res) {
	console.log("Hey ? what the fuck is going on?");
	res.render('imageuploader/uploader');	
}

exports.upload = function (req, res) {	
	fs.readFile(req.files.image.path, function (err, data) {
		var imageName = req.files.image.name;
		if(!imageName){
			console.log("seems to be an error this file has not got a name");
			res.redirect("/");
			res.end();
		
		}else{
		
			res.redirect("/gallery");
		 
		}		
});
}

