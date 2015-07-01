define(["backbone", "events", "collections/photo", "views/photoCollection", "views/singleDetailView"], function(Backbone, Events, photoCollection, photoCollectionView, singleDetailView) {
	var photoRouter = Backbone.Router.extend({
		initialize: function() {
			var self = this;
			console.log("we here?");
		    this._setupCollection();
		    Events.on("router:navigate", function(url) {
		        self.navigate(url, { trigger: true });
		      });
	    },
	    
	    routes: {
	    	"gallery": "illustration",
	    	"photo": "singleIll"
	    },
	    _setupCollection: function() {
	    	console.log("initalize calls setupcollection");
			if(this.collection) return;
			var data = $("#intialContent").html();
			if(data != undefined){
			this.collection = new photoCollection(JSON.parse(data));
			}
		},
		
		_renderView: function(view) {
			$(".app").html(view.render().el);
			$(".img-fade").animate({ opacity: 1,}, 2000)
		},
		//Gets the illustration gallery photos from the db creates the view and 
		// renders anything with .app div. 
		illustration: function() {
			console.log("we went to gallery and were here");
			var view = new photoCollectionView({collection: this.collection});
			this._renderView(view);  
		},
		singleIll: function(id){
			
			var split = id.split("=");
			var singleIllustrationId = split[1];
			var singleIllustration = this.collection.findWhere({_id: singleIllustrationId});

			//looping through the collection to get the prev/Next Illustrations

			var current = 0;
			var counter = 0;
			this.collection.each(function(photo){
				if(singleIllustration.get("_id") === photo.get("_id")){
					current = counter;	
				}
				counter++;
			});

			var currentPhoto = this.collection.at(current);
			var currentPhotoURL = currentPhoto.get("image").url;
			var prevLink = "";
			var nextLink = "";
	
			if(current >= 1) { 
				var prevPhoto = this.collection.at(current - 1);
				prevLink = prevPhoto.get("_id");
			}
			console.log("our current is " + current);
			console.log(this.collection.length);
			if(current + 1 != this.collection.length) {
				var nextPhoto = this.collection.at(current + 1);
				nextLink = nextPhoto.get("_id");
			}
	
			singleIllustration.set({nextUrl: nextLink});
			singleIllustration.set({prevUrl: prevLink});
	
			var view = new singleDetailView({model: singleIllustration});
			this._renderView(view);
	
		},
	});
	return photoRouter;
});