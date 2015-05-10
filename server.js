var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/config');
var livereload  = require('express-livereload');
var app = express();


//====================================
// DATABASE CONNECTION
//=====================================
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/paddysdb');

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
// Starting Server
//===============================
livereload(app, {watchDir: process.cwd() + "/app/"});
app.listen(config.express.port, config.express.ip, function (error) {
  if (error) {
    log.error("Unable to listen for connections", error);
    process.exit(10);
  }
  log.info("express is listening on http://" +
    config.express.ip + ":" + config.express.port);
});

module.exports = app;