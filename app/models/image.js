var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var imageSchema = new Schema ({
	 title      : { type : String, length   : 255 },
	 image      : { type : JSON}

});