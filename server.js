var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var Config = require('./config/config');
var app = express();

config = new Config();
//====================================
// DATABASE CONNECTION
//=====================================
var mongoose = require('mongoose');
mongoose.connect(config.mongodburl);

var db = mongoose.connection;

db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('connected.');
});
//========================
//LOGGING
//========================
var bole = require("bole");

bole.output({level: "debug", stream: process.stdout});
var log = bole("server");

log.info("server process starting");

//======================
// Bootstraping
//======================
require('./config/passport')(passport, config);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

//=============================
// Development Server Config
//===============================
console.log("*******************" + process.env.NODE_ENV + "****************************");
if(process.env.NODE_ENV === 'development' || 'test'){
	console.log("*******************8IN HERE*************************");
	var livereload  = require('express-livereload');
	livereload(app, {watchDir: process.cwd() + "/app/"});
	
	app.listen(config.port, config.ip, function (error) {
		if (error) {
			log.error("Unable to listen for connections", error);
			process.exit(10);
		}
		log.info("express is listening on http://" +
		config.ip + ":" + config.port);
	});
}

//===============================
// Production Server Config
//===============================
if(process.env.NODE_ENV === 'production'){
app.listen(process.env.PORT || config.port, function (error){
	if(error){
		log.error("Unable to listen for connections ", error);
		process.exit(10);
	}
});
}

module.exports = app;