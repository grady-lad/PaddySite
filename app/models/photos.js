"use strict";
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var photoSchema = new Schema ({
	 //title      : { type : String, length   : 255 },
	 image  : { type : JSON},
	 croppedImage : String

});

module.exports = mongoose.model('Photo', photoSchema);