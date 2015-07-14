var common = require("../common");
var assert = common.assert;
var chai = common.chai;
var expect = chai.expect;
var Browser = common.Browser;

describe("Home Page Tests" , function () {
	
	before(function(){
		this.browser = new Browser({ site: 'http://127.0.0.1:3000' });
	});
	
	beforeEach(function(done) {
	    this.browser.visit('/', done);
	  });
	
	it('should show home page', function(){
		assert.ok(this.browser.success);
		assert.equal(this.browser.text('title'), 'Paddy Walsh Illustration - Home');
		expect(this.browser.query('#homeImg')).to.exist;
	});
});

describe("About Page Tests" , function () {
	
	before(function(){
		this.browser = new Browser({ site: 'http://127.0.0.1:3000' });
	});
	
	beforeEach(function(done) {
	    this.browser.visit('/about', done);
	  });
	
	it('should show about page', function(){
		assert.ok(this.browser.success);
		assert.equal(this.browser.text('title'), 'Paddy Walsh Illustration - About');
		expect(this.browser.query('#aboutImg')).to.exist;
		expect(this.browser.query('.about-text')).to.exist;
	});
});

describe("Blog Page Tests" , function () {
	
	before(function(){
		this.browser = new Browser({ site: 'http://127.0.0.1:3000' });
	});
	
	beforeEach(function(done) {
	    this.browser.visit('/Blog', done);
	  });
	
	it('should show blog page', function(){
		assert.ok(this.browser.success);
		assert.equal(this.browser.text('title'), 'Paddy Walsh Illustration - Blog');
		expect(this.browser.query('#blogImg')).to.exist;
		expect(this.browser.query('.about-text')).to.exist;
	});
});
	
describe("Contact Page Tests", function () {
	this.timeout(15000);
	before(function(){
		this.browser = new Browser({ site: 'http://127.0.0.1:3000' });
		//this.browser.visit('/contact', done);
	});
	// load the contact page before each test
	  beforeEach(function(done) {
	    this.browser.visit('/contact', done);
	  });
	it('should show contact a form', function(){
		assert.ok(this.browser.success);
		assert.equal(this.browser.text('title'), 'Paddy Walsh Illustration - Contact');
		this.browser.assert.element('#feedback');
		this.browser.assert.element('#contactemail');
		this.browser.assert.element('#contactsuggestion');
		this.browser.assert.element('#submit_button');
	});
	/** NOTE: double done, done used so that if an error is thrown
	 *  it is caught within the first then and passed to done done(error).
	 *  If it succeeds then done() is called and the test will pass **/
	it('should refuse empty submissions', function(done){
		var browser = this.browser;
		browser.pressButton('Send').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('title'), 'Paddy Walsh Illustration - Contact');
			/**TODO: Seperate out the error message strings **/
			assert.equal(browser.text('#errorMessage'), 'A valid email addressAn actual Message');
		}).then(done, done);
	});
	it('should refuse invalid emails', function(done){
		var browser = this.browser;
		browser.fill('email', 'balah9289');
		browser.fill('suggestion', 'Get your hair sorted paddy');
		browser.pressButton('Send').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('title'), 'Paddy Walsh Illustration - Contact');
			/**TODO: Seperate out the error message strings **/
			assert.equal(browser.text('#errorMessage'), 'A valid email address');
		}).then(done, done);
	});
	it('should accept complete submissions', function(done){
		var browser = this.browser;
		browser.fill('email','johner123@gmail.com');
		browser.fill('suggestion','How much do ya do this for sir?');
		browser.pressButton('Send').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('title'), 'Paddy Walsh Illustration - Contact');
			/**TODO: Seperate out the error message strings **/
			assert.equal(browser.text('#successMessage'), 'Message sent, Thanks!');
		}).then(done, done);
	});
});