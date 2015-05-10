var fs    = require('fs');
exports.home = function (req, res) {
  res.render("site/home");
}

exports.gallery = function (req, res) {
	var images = [];
	var dir = "../public"
	var files = fs.readdirSync(__dirname + "/../public/uploads");
    for(var i in files){ 
        if (!files.hasOwnProperty(i)) continue;
        var name = '/uploads/'+files[i];
        console.log(name);
        images.push(name);
    }
    	res.render("site/gallery", {images: images });
}

exports.contact = function(req, res) {
	res.render("site/contact" , {message: '', errors: {} });


}



