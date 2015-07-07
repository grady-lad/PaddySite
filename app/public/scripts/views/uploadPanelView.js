define(["backbone", "jquery", "events"], function(Backbone, $, Events) {
	var uploadPanelView = Backbone.View.extend({
		
		initialize: function(){
    	this.setUpForm();
    	
    	$('.uploading').click(function(e) {
    		e.preventDefault();
    		console.log("were here right?");
    		Events.trigger("router:navigate", "/imagepanel");
    	});
 		},
 		
 		uploadPhoto: function(){
 			console.log("clickity click");
 		},
 		
 		setUpForm: function() {
 			$.cloudinary.config({
 				"api_key": "932255541789328",
 				"cloud_name": "dzx1ez426"
 			});
 			$('.cloudinary-fileupload').unsigned_cloudinary_upload("t4d6bca8", {
 				disableImageResize: false,
 				imageMaxWidth: 1000,
 				imageMaxHeight: 1000,
 				acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp|ico)$/i,
 				maxFileSize: 5000000 // 5MB
 			}).bind('cloudinaryprogress', function(e, data) {
 				$('.status').text("Uploading... " + Math.round((data.loaded * 100.0) / data.total) + "%");
 			}).bind('cloudinaryfail', function(e, data) {
 				$('.status').text("upload failed");
 			}).off("cloudinarydone").on("cloudinarydone", function(e, data) {
 				$(".status").text("");
 				var preview = $(".preview").html('');
 				$.cloudinary.image(data.result.public_id, {
 					format: data.result.format,
 					width: 50,
 					height: 50,
 					crop: "fit"
 				}).appendTo(preview);

 				$('<a>').
 				addClass('delete_by_token').
 				attr({
 					href: '#'
 				}).
 				data({
 					delete_token: data.result.delete_token
 				}).
 				html('&times;').
 				appendTo(preview).
 				click(function(e) {
 					e.preventDefault();
 					$.cloudinary.delete_by_token($(this).data('delete_token')).done(function() {
 						$('.preview').html('');
 						$('#info').html('');
 						$("#photo_bytes").val('');
 						$('input[name="photo[image]"]').remove();
 					}).fail(function() {
 						$('.status').text("Cannot delete image");
 					});
 				});
 			});
 		}
	});
	return uploadPanelView;
});	