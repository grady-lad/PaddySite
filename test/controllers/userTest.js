var common = require("../common");
var assert = common.assert;
var chai = common.chai;
var expect = chai.expect;
var Browser = common.Browser;

describe("Register User Tests" , function () {
	this.timeout(15000);
	before(function(){
		
		this.browser = new Browser({ site: 'http://127.0.0.1:3000' });
	});
	
	beforeEach(function(done) {
	    this.browser.visit('/signup', done);
	  });
	
	it('should show register form', function(){
		assert.ok(this.browser.success);
		assert.equal(this.browser.text('title'), 'Signup');
		this.browser.assert.element('#loginemail');
		this.browser.assert.element('#password');
		this.browser.assert.element('.btn');
	});
	
	it('should refuse invalid emails', function(done){
		var browser = this.browser;
		browser.fill('email','johner123');
		browser.fill('password','password123');
		browser.pressButton('Signup').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('title'), 'Signup');
			assert.equal(browser.text('.alert'), 'Please enter a valid email.');
		}).then(done, done);
	});
	it('should refuse passwords > 6', function(done){
		var browser = this.browser;
		browser.fill('email','johner123@gmail.com');
		browser.fill('password','pass');
		browser.pressButton('Signup').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('title'), 'Signup');
			assert.equal(browser.text('.alert'), 'Passwords must contain more than six characters.');
		}).then(done, done);
	});
	
	it('should refuse if user already exists', function(done){
		var browser = this.browser;
		browser.fill('email','heyho@gmail.com');
		browser.fill('password','password');
		browser.pressButton('Signup').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('title'), 'Signup');
			assert.equal(browser.text('.alert'), 'That email is already taken.');
		}).then(done, done);
	});
	
	it('should Register user if details are valid', function(done){
		var browser = this.browser;
		browser.fill('email','testyBoo@gmail.com');
		browser.fill('password','password1234');
		browser.pressButton('Signup').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('title'), 'Admin Homepage');
		}).then(done, done);
	});
	
});

describe("Login User Tests" , function () {
	this.timeout(15000);
	before(function(){
		
		this.browser = new Browser({ site: 'http://127.0.0.1:3000' });
	});
	
	beforeEach(function(done) {
	    this.browser.visit('/login', done);
	  });
	
	it('should show login form', function(){
		assert.ok(this.browser.success);
		assert.equal(this.browser.text('title'), 'Login');
		this.browser.assert.element('#loginemail');
		this.browser.assert.element('#password');
		this.browser.assert.element('.btn');
	});
	
	it('should refuse wrong emails', function(done){
		var browser = this.browser;
		browser.fill('email','johner123');
		browser.fill('password','password123');
		browser.pressButton('Login').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('title'), 'Login');
			assert.equal(browser.text('.alert'), 'No user found.');
		}).then(done, done);
	});
	
	it('should refuse wrong Password', function(done){
		var browser = this.browser;
		browser.fill('email','heyho@gmail.com');
		browser.fill('password','password123');
		browser.pressButton('Login').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('title'), 'Login');
			assert.equal(browser.text('.alert'), 'Oops! Wrong password.');
		}).then(done, done);
	});
	
	it('should login with correct credentials', function(done){
		var browser = this.browser;
		browser.fill('email','heyho@gmail.com');
		browser.fill('password','password');
		browser.pressButton('Login').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('title'), 'Admin Homepage');
		}).then(done, done);
	});
});

//TODO: Mock up sessions for Logout functionality!!!

describe("IsLoggedIn User Tests" , function () {
	this.timeout(15000);
	before(function(){
		
		this.browser = new Browser({ site: 'http://127.0.0.1:3000' });
	});
	
	beforeEach(function(done) {
	    this.browser.visit('/imagepanel', done);
	  });
	
	it('should Return to loginPage', function(){
		assert.ok(this.browser.success);
		assert.equal(this.browser.text('title'), 'Login');
		this.browser.assert.element('#loginemail');
		this.browser.assert.element('#password');
		this.browser.assert.element('.btn');
	});
});
	
	
	