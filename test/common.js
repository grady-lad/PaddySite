/* Used to manage all of our test modules**/
var assert = require("chai").assert;
var http   = require("http");
var server = require("../server");

exports.assert = assert;
exports.http = http;
exports.server = server;