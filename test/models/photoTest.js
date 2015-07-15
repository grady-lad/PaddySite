var Photo = require ('../../app/models/photos');
var fs	  = require('fs');
var image;
var common = require("../common");
var chai = common.chai;
var expect = chai.expect;


describe("Photo Model Tests" , function () {
	
	before(function(done){
		fs.readFile(__dirname + '/../data/photo.json', handleFile)
		// Write the callback function
		function handleFile(err, data) {
		    if (err) throw err
		    image = JSON.parse(data)
		}
		done();
	});

	it('Photo Model should save photo', function(done){
		photo = new Photo(image);
		photo.save(function(err, photo){
			if(err){
				done(err);
			}
			expect(photo.image).to.equal(image.image);
			done();
		});
	});
	
	it('Photo Model should find model', function(done){
		Photo.findOne({'image.public_id': image.image.public_id }, function(err, photo){
			if(err){
				done(err);
			}
			expect(photo.image.public_id).to.equal(image.image.public_id);
			done();
		});
	});
	
	after(function(done){    
		Photo.findOneAndRemove({'image.public_id': image.image.public_id}, function(err) {      
			if(err){
				done(err);
			}    
		});  
		done();
	});
	
});
