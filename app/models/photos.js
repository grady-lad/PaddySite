var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var photoSchema = new Schema ({
	 //title      : { type : String, length   : 255 },
	 image      : { type : JSON}

});


module.exports = mongoose.model('Photo', photoSchema);