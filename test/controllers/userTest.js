var common = require("../common");
var assert = common.assert;
var chai = common.chai;
var expect = chai.expect;
var Browser = common.Browser;

describe("Register User Tests" , function () {
	
	before(function(){
		this.browser = new Browser({ site: 'http://127.0.0.1:3000' });
	});
	
	beforeEach(function(done) {
	    this.browser.visit('/signup', done);
	  });
	
	it('should show reigister form', function(){
		assert.ok(this.browser.success);
		assert.equal(this.browser.text('title'), 'Signup');
		this.browser.assert.element('#loginemail');
		this.browser.assert.element('#password');
		this.browser.assert.element('.btn');
	});
	
	it('should refuse empty submissions', function(done){
		var browser = this.browser;
		browser.pressButton('Send').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('title'), 'Signup');
			/**TODO: Seperate out the error message strings **/
			assert.equal(browser.text('#errorMessage'), 'A valid email addressAn actual Message');
		}).then(done, done);
	});
});
	