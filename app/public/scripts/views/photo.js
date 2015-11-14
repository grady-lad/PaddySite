define(["backbone", "handlebars", "jquery", "events"], function(Backbone, Handlebars, $, Events) {
	var photoView = Backbone.View.extend({
		
		events: {
		"click .singleIllLink": "singleIllView",
	   "click .remove": "removePhoto",
	   "click .crop": "showModal",
	   "click .closure": "closeModal",
	   "click .cropPrev": "showCrop",
	   "click .saveCrop": "saveCrop",
	   "mouseover .uploadImage": "showMenu"
		},
		render: function(){
			"use strict";
			var template = $("#illustrationTemplate").html();
			var compiled = Handlebars.compile(template);
			//Pass the attributes to #illustrationTemplate and create the div there.
			var html = compiled(this.model.attributes);
			this.$el.html(html);
			return this;
		},
		//When a model is clicked we to navigate to '/photo?id='
		// and let our router do the rest :)
		singleIllView: function(e){
			"use strict";
			e.preventDefault();
			//var id = this.model.get("image").created_at;
			var id = this.model.get("_id");
			//router.navigate("photo?id=" + id, {trigger: true});
			var url = "photo?id=" + id;
		    Events.trigger("router:navigate", url);
		},
		
		removePhoto: function(e){
			"use strict";
			e.preventDefault();
			var self = this;
			//Events.trigger("router:navigate", "/removeImage");
			this.model.destroy({success:function(model , response){
				self.remove();
			},
			error:function(model , response){
				$('.status').text('Could not delete image');
			}});
		},

		showMenu: function(){
			console.log("Hovered");
		},

		showModal: function(){
      this.$('.modalContainer').show();
		},

		closeModal: function(){
		  this.$('.modalContainer').hide();
		},

		showCrop: function(e){
			e.preventDefault();
			var newUrl = "";
			var url = this.model.attributes.image.url;
			var start = "";
			var end = "";
			var point = url.indexOf('upload');

			var size = this.checkOption($( '#cropSize' ).val()) ? "" : $( '#cropSize' ).val() + ",";
			var gravity = this.checkOption($( '#cropGravity' ).val()) ? "" : $('#cropGravity').val();
			console.log("size is " + size);

			start = url.slice(0 , (point+6));
			end = url.slice(point + 6);
			newUrl = start + "/c_crop," + size + gravity + end;
			this.$('.cropper').attr('src', newUrl);
		},

		checkOption: function(option){
			if(option === 'Select Direction' || option === 'Select Size'){
				console.log("in the true with this " + option);
				return true;
			}
			return false;
		},

		saveCrop: function(e){
		  e.preventDefault();
			var size = $( '#cropSize' ).val();
			var gravity = $('#cropGravity').val();
			var url = this.model.attributes.image.url;
			var point = url.indexOf('upload');

			var start = url.slice(0 , (point+6));
			var end = url.slice(point + 6);
			var newUrl = "";
			if(!this.checkOption(size) && !this.checkOption(gravity)){
			  newUrl = start + "/c_crop," + size + "," + gravity + end;
			  console.log("making the reuest with");
			  console.log("id " + this.model.id);
			  console.log("url " + newUrl);
			  //Make an ajax request to whatever url we define in our route
			  $.post('/updateCrops', 
			  	{data: {
			  		id: this.model.id,
			  		cropped: newUrl
			  	}
			  })
    		.done( function(msg) { console.log(msg); } )
    		.fail( function(xhr, textStatus, errorThrown) {
          console.log("uggh");
    		});
			  //in our route specify what method we will use to handle the request - DONE
			  //update the models croppedImage parameter - DONE
			  //return the response. - DONE
			  //SAVE IMAGE TO MONOGDB 
			  //display success message.
			  //Update the frontend to show the croppedImage
			  //Error handling for no cropped image(front and back)
			  //Styling of the imagecropper.
			  //restyle the uploader panel 3 * 3 bullshit
			 	this.model.set("croppedImage" , newUrl);
			 	console.log(this.model);
			 }
			 console.log("not in it");
		}
	});
	return photoView;
});