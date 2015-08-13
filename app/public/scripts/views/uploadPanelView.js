define(["backbone", "jquery", "events"], function(Backbone, $, Events) {
	var uploadPanelView = Backbone.View.extend({
		
		initialize: function(){
    		this.setUpForm();
    		$(".uploadbutton").click(function(e){
    			if($(".preview").children().length < 1){	
    				e.preventDefault();
    				$('.status').text("Please select a file before uploading");
    			}			
    		});		
 		},
 		
 		setUpForm: function() {
 			console.log("what the fuck");
 			$.cloudinary.config({
 				"api_key": "932255541789328",
 				"cloud_name": "dzx1ez426"
 			});
 			$('.cloudinary-fileupload').unsigned_cloudinary_upload("t4d6bca8", {
 				disableImageResize: false,
 				imageMaxWidth: 1000,
 				imageMaxHeight: 1000, 
 				acceptFileTypes: "/(\.|\/)(gif|jpe?g|png|bmp|ico)$/i",
 				maxFileSize: 5000000 //5mb
 			}).bind('cloudinaryprogress', function(e, data) {
 				$('.status').text("Uploading... " + Math.round((data.loaded * 100.0) / data.total) + "%");
 			}).bind('cloudinaryfail', function(e, data) {
 				$('.status').text("upload failed");
 			}).off("cloudinarydone").on("cloudinarydone", function(e, data) {
 				$(".status").text("");
 				var preview = $(".preview").html('');
 				$.cloudinary.image(data.result.public_id, {
 					format: data.result.format,
 					width: 200,
 					height: 200,
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
 				html('remove').
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