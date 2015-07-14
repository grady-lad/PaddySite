/* Used to manage all of our test modules**/
var assert 		  = require("chai").assert;
var http   		  = require("http");
var server 		  = require("../server");
var sw	   		  = require("selenium-webdriver");
var chai 		  = require("chai");
var chaiWebdriver = require("chai-webdriver-promised");
var Browser 	  = require('zombie');

exports.assert = assert;
exports.http = http;
exports.server = server;
exports.sw = sw;
exports.chai = chai;
exports.chaiWebdriver = chaiWebdriver;
exports.Browser = Browser;