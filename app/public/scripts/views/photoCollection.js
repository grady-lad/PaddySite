define(["backbone", "views/photo"], function(Backbone, photoView) {
	var photoCollectionView = Backbone.View.extend({
	  initialize: function(){
	    //When the collection reset function is called call on the render method
	    this.listenTo(this.collection, "reset", this.render);
	    this.listenTo(this.collection, "add", this.tester);
	 	},

	 	setUpNewRow: function(){
	 	  var row = $('<div class="row illRow"></div>');
	 		$('.app').append(row);
	 		return row;
		 	//this.$el.append(row);
	 	},
	 	
	 	renderB: function(){
	 		//We want to call this from the router
	 		//When we have created an image or a row call resolve.
	 		//Within resolve add the images to the page.
	 		var self 	= this,
	 		 	counter = 0,
	 			row;
	 		if(self.collection){
	 		  self.collection.each(function(photo){
	 				var id =  '#' + photo.attributes.image.public_id,
	 					  url = photo.attributes.image.url,
	 					  point = url.indexOf('upload');
	 				url = url.slice(0 , (point+6)) + '/h_400' + url.slice(point + 6);
	 				
	 				photo.set({
	 					small_url: url
	 				});

	 				if(counter === 0 ||counter % 3 === 0){
		 				row = self.setUpNewRow();
		 			}

		 			var photoV = new photoView({model: photo});
		 			row.append(photoV.render().el);
		 			$(id).bind('load', function(){
		 				//Need to add a class rather then fadeTo
						//$(this).fadeTo('slow' , 1);
						$(this).addClass("fadeIn");
					});
		 			counter++;
	 			}, self , function(){
	 				document.getElementsByClassName('loading').style.display = 'none';
	 			});
	 		}
	 	},

	 	tester: function(photo){
	 		var photoV 	  = new photoView({model: photo}),
	 		 	lastRow   = $('.illRow:last'),
	 		 	colAmount = $('.illRow:last > div').size(),
	 			row;
	 		if(lastRow.length > 0 && colAmount <= 2){
	 			lastRow.append(photoV.render().el);
	 		}else{
	 			row = this.setUpNewRow();
	 			row.append(photoV.render().el);
	 		}
	 	}
	});
	return photoCollectionView;
});
