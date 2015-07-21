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
	 		"use strict";
	 		this.$el.html("");
	 		var counter = "0";
	 		var row;
	 		//NOTE FINAL ROW CONTAINS NEWEST IMAGES
	 		this.collection.each(function(photo){
	 		    //Increment a counter for every photo
	 			//Create row if counter is 0 or a modulus of 3
	 			if (counter == 0 || counter % 3 == 0){
	 				row = $('<div class="row illRow"></div>');
	 			}
	 			//Set up the image div 'col-md-4' located in illustrationTemplate
	 			var photoV = new photoView({model: photo});
	 			//add the photo div within our row
	 			row.append(photoV.render().el);
	 			//append the row
	 			this.$el.append(row);
	 			counter++;
	 		}, this);
	 		return this;
	 	}
	});
	
	return photoCollectionView;
});
