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
	 		var counter = 0;
	 		var row;
	 		//NOTE FINAL ROW CONTAINS NEWEST IMAGES
	 		this.collection.each(function(photo){
	 			console.log("here?");
	 		    //Increment a counter for every photo
	 			//Create row if counter is 0 or a modulus of 3
	 			if(counter == 0){
	 			 row = $('<div class="row illRow"></div>');
	 			}
	 			else if(counter % 3 == 0){
	 				//SHO	W THE ROW !!!!!!
	 				//append previous row
	 				$(".app").append(row);
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
	 		// SHOW THE ROW
	 		return this;
	 	},
	 	
	 	testyRender: function(){
	 		"use strict";
	 		var counter = 0;
	 		var row;
	 		var self = this;
	 		var promise = new Promise(function(resolve, reject){		
	 			self.collection.each(function(photo){
	 				//Create row if counter is 0 or a modulus of 3
	 				if(counter == 0){
	 					row = $('<div class="row illRow"></div>');
	 				}
	 				else if(counter % 3 == 0){
	 					resolve(row);
	 					row = $('<div class="row illRow"></div>');
	 				}	
	 				//Set up the image div 'col-md-4' located in illustrationTemplate
	 				var photoV = new photoView({model: photo});
	 				//add the photo div within our row
	 				row.append(photoV.render().el);
	 				//append the row
	 				counter++;
	 			}, self);
	 			resolve(row);
	 		}).then(function(val){
	 			$(".loading").hide();
		 		$(".app").append(val);
		 		$(".img-fade").animate({ opacity: 1}, 2000);
	 		}).catch(function(error){
	 			$(".loading").hide();
	 			$(".app").append('<div class="error">ERROR: ' + error + '</div>');
	 		});
	 	},
	 	addOne: function(el){
	 		//conosle.log("fuck you");
	 		$(".loading").hide();
	 		$(".app").append(el);
	 		$(".img-fade").animate({ opacity: 1}, 2000);
	 	}
	});
	//if the row is equal to 0 create the 1st row. 
	//if the counter is a modulus of 3.
	//render the row, return it and continue looping 
	return photoCollectionView;
});
