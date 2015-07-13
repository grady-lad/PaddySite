var common = require("./common");
var http = common.http;
var assert = common.assert;

it("should return a 200 response", function (done) {
    http.get("http://127.0.0.1:3000", function (res) {
        assert.equal(res.statusCode, 200);
        done();
    });
});