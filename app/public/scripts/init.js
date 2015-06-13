$(function(){
	window.router = new photoRouter();
	Backbone.history.start({pushState: true});
});