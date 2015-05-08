var mongoose=require('mongoose');

//Define the schema for the image model
var Schema=mongoose.Schema;

var imageSchema = new Schema({
	
	img         : {
	data        : Buffer,
	name 		: String
	}
});


module.exports = mongoose.model('Image', imageSchema);
