var fs    = require('fs');
exports.home = function (req, res) {
  res.render("site/home");
}

exports.gallery = function (req, res) {
  //Image.find({}, function(err, image){
    //if (err)
      //res.send(err);
    //else
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
  //});
}


