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
	    	
			if(this.collection){return this.collection;} 
			var data = $("#intialContent").html();
			if(data !== undefined){
			this.collection = new photoCollection(JSON.parse(data));
			}
		},
		
		_renderView: function(view) {
			$(".app").append(view.render().el);
		},
		//should manage this better?
		renderViewIll: function(view){
			$(".app").html(view.render().el);
			$(".img-fade").animate({ opacity: 1}, 2000);
		},
		//Gets the illustration gallery photos from the db creates the view and 
		// renders anything with .app div. 
		illustration: function() {
			var counter = 0;
			$('.app').html('');
			$(".app").append('<div class="loading"></div>');
			var view = new photoCollectionView({collection: this.collection});
			view.renderB();
			
			//this._renderView(view);
		},
		/**
		 * The below is a mess!!! really need to fix it up sooon!!!
		 */
		singleIll: function(id){
			"use strict";
			var split = id.split("=");
			var singleIllustrationId = split[1];
			var singleIllustration = this.collection.findWhere({_id: singleIllustrationId});
			var currentIndex = this.collection.indexOf(singleIllustration);
			var prevLink = this.collection.getPrevUrl(currentIndex);
			var nextLink = this.collection.getNextUrl(currentIndex);
			
			singleIllustration.set({nextUrl: nextLink});
			singleIllustration.set({prevUrl: prevLink});
	
			var view = new singleDetailView({model: singleIllustration});
			this.renderViewIll(view);
	
		},
		
		uploader: function(){
			"use strict";
			$(".app").append('<div class="loading"></div>');
			var uploadView = new uploadPanelView();
			var view = new photoCollectionView({collection: this.collection});
			this._renderView(view);  
		}
	});
	return photoRouter;
});