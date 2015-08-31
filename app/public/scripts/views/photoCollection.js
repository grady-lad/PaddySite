define(["backbone", "views/photo"], function(Backbone, photoView) {
	var photoCollectionView = Backbone.View.extend({
	    initialize: function(){
	        //When the collection reset function is called call on the render method
	    	this.listenTo(this.collection, "reset", this.render);
	    	this.listenTo(this.collection, "add", this.tester);
	 	},
	 	setUpRows: function(){
	 	 //TODO: Move render logic into here.
	 	},
	 	render: function(){
	 		var self = this;
	 		var counter = 0;
	 		var row;
	 		self.collection.each(function(photo){
	 			setTimeout(function(){
	 				if(counter == 0 ||counter % 3 == 0){
		 				//SHOW THE ROW !!!!!!
		 				//append previous row
		 				row = $('<div class="row illRow"></div>');
		 			}
		 			//Set up the image div 'col-md-4' located in illustrationTemplate
		 			var photoV = new photoView({model: photo});
		 			//add the photo div within our row
		 			row.append(photoV.render().el);
		 			//append the row
		 			self.$el.append(row);
		 			counter++;
		 			$(".img-fade").animate({ opacity: 1}, 2000);
		 			$('.loading').hide();
	 			}, 1000);
	 		}, self);
	 		return this;
	 	},


	 	renderB: function(){
	 		//We want to call this from the router
	 		//When we have created an image or a row call resolve.
	 		//Within resolve add the images to the page.
	 		var self = this;
	 		var counter = 0;
	 		var row;
	 			self.collection.each(function(photo){
	 				var photoV = new photoView({model: photo});
	 				if(counter == 0 ||counter % 3 == 0){
		 				//SHOW THE ROW !!!!!!
		 				//append previous row
		 				row = $('<div class="row illRow"></div>');
		 				$('.app').append(row);
		 			}
		 			var photoV = new photoView({model: photo});
		 			row.append(photoV.render().el);
		 			$('.loading').hide();
		 			//$(".img-fade").animate({ opacity: 1}, 2000);
		 			counter++;			
	 			}, self);
	 		
	 	},

	 	tester: function(photo){
	 		var photoV = new photoView({model: photo})
	 		var lastRow = $('.illRow:last');
	 		lastRow.append(photoV.render().el);
	 	}
	});
	return photoCollectionView;
});
