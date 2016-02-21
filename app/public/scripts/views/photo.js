define(["backbone", "handlebars", "jquery", "events"], function(Backbone, Handlebars, $, Events) {
	var photoView = Backbone.View.extend({

		events: {
		"click .singleIllLink": "singleIllView",
	   "click .remove": "removePhoto",
	   "click .crop": "showModal",
	   "click .closure": "closeModal",
	   "click .cropPrev": "showCrop",
	   "click .saveCrop": "saveCrop"
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

		showModal: function(e){
			e.stopPropagation();
      this.$('.modalContainer').show();
      $('.illRow').find('.editImage').addClass('no-hover');
		},

		closeModal: function(){
		  this.$('.modalContainer').hide();
		  $('.illRow').find('.editImage').removeClass('no-hover');
		},

		showCrop: function(e){
			e.preventDefault();
			e.stopPropagation();
			var newUrl = "";
			var url = this.model.attributes.image.url;
			var start = "";
			var end = "";
			var point = url.indexOf('upload');

			var size = this.checkOption(this.$( '.cropSize' ).val()) ? "" : this.$( '.cropSize' ).val() + ",";
			var gravity = this.checkOption(this.$( '.cropGravity' ).val()) ? "" : this.$('.cropGravity').val();


			start = url.slice(0 , (point+6));
			end = url.slice(point + 6);
			newUrl = start + "/c_crop,h_" + size + gravity + end;
			this.$('.cropper').hide();
			var self = this;
			var i = $('<img />').attr('src',newUrl).load(function() {
            self.$('.cropper').attr('src', i.attr('src'));
            self.$('.cropper').css('background-image', 'none');
            self.$('.cropper').css('max-heigth', '100%');
            self.$('.cropper').fadeIn();
      });
		},

		checkOption: function(option){
			if(option === 'Select Direction' || option === 'Select Size'){
				return true;
			}
			return false;
		},

		saveCrop: function(e){
		  e.preventDefault();
		  var self = this;
			var size = this.$( '.cropSize' ).val();
			var gravity = this.$('.cropGravity').val();
			var url = this.model.attributes.image.url;
			var point = url.indexOf('upload');

			var start = url.slice(0 , (point+6));
			var end = url.slice(point + 6);
			var newUrl = "";
			if(!this.checkOption(size) && !this.checkOption(gravity)){
			  newUrl = start + "/c_crop,h_" + size + "," + gravity + end;
			  //Make an ajax request to whatever url we define in our route
			  $.post('/updateCrops',
			  	{data: {
			  		id: this.model.id,
			  		cropped: newUrl
			  	}
			  })
    		.done( function(msg) {
    			self.model.set("croppedImage" , newUrl);
    			alert("image Saved!");
    		} )
    		.fail( function(xhr, textStatus, errorThrown) {
          console.log("uggh");
    		});
			 }
		}
	});
	return photoView;
});
