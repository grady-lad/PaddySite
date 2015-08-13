define(["backbone", "views/photo"], function(Backbone, photoView) {
	var photoCollectionView = Backbone.View.extend({
	    initialize: function(){
	        //When the collection reset function is called call on the render method
	    	this.listenTo(this.collection, "reset", this.render);
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
		 				//SHO	W THE ROW !!!!!!
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
	 	}
	});
	return photoCollectionView;
});
