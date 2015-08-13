define(["backbone", "events", "collections/photo", "views/photoCollection", "views/uploadPanelView", "views/singleDetailView", "jqueryCloudinary"], function(Backbone, Events, photoCollection, photoCollectionView, uploadPanelView, singleDetailView, cloudinary) {
	var photoRouter = Backbone.Router.extend({
		initialize: function() {
			var self = this;
		    this._setupCollection();
		    Events.on("router:navigate", function(url) {
		        self.navigate(url, { trigger: true });
		      });
	    },
	    
	    routes: {
	    	"gallery": "illustration",
	    	"photo": "singleIll",
	    	"imagepanel": "uploader"
	    },
	    _setupCollection: function() {
			if(this.collection) return;
			var data = $("#intialContent").html();
			if(data !== undefined){
			this.collection = new photoCollection(JSON.parse(data));
			}
		},
		
		_renderView: function(view) {
			$(".loading").hide();
			$(".app").html(view.render().el);
			$(".img-fade").animate({ opacity: 1}, 2000);
		},
		//Gets the illustration gallery photos from the db creates the view and 
		// renders anything with .app div. 
		illustration: function() {
			var self = this;
			var view = new photoCollectionView({collection: self.collection});
			self._renderView(view);	 
		},
		/**
		 * The below is a mess!!! really need to fix it up sooon!!!
		 */
		singleIll: function(id){
			"use strict";
			var split = id.split("=");
			var singleIllustrationId = split[1];
			var singleIllustration = this.collection.findWhere({_id: singleIllustrationId});

			//looping through the collection to get the prev/Next Illustrations

			var current = 0;
			var counter = 0;
			this.collection.each(function(photo){
				if(singleIllustration.get("_id") === photo.get("_id")){
					current = counter;
					//Sjould be exiting the loop here
				}
				counter++;
			});

			var currentPhoto = this.collection.at(current);
			var prevLink = "";
			var nextLink = "";
	
			if(current >= 1) { 
				var prevPhoto = this.collection.at(current - 1);
				prevLink = prevPhoto.get("_id");
			}
			
			if(current + 1 != this.collection.length) {
				var nextPhoto = this.collection.at(current + 1);
				nextLink = nextPhoto.get("_id");
			}
	
			singleIllustration.set({nextUrl: nextLink});
			singleIllustration.set({prevUrl: prevLink});
	
			var view = new singleDetailView({model: singleIllustration});
			this._renderView(view);
	
		},
		
		uploader: function(){
			"use strict";
			console.log("ehhhehehehehe what the fuck");
			var uploadView = new uploadPanelView();
			var view = new photoCollectionView({collection: this.collection});
			this._renderView(view);  
		}
	});
	return photoRouter;
});