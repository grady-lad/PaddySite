define(["backbone", "events", "collections/photo", "views/photoCollection"], function(Backbone, Events, photoCollection, photoCollectionView) {
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
			var data = $("#intialContent").html();
			if(data !== '[]'){
				$(".app").append('<div class="loading"></div>');
			}
			this.collection = new photoCollection(JSON.parse(data));
			return this.collection;
		},
		
		_renderView: function(view) {
			$(".app").append(view.render().el);
		},
		//should manage this better?
		renderViewIll: function(view){
			$(".app").html(view.render().el);
		},
		//Gets the illustration gallery photos from the db creates the view and 
		// renders anything with .app div. 
		illustration: function() {
			$('.app').html('');
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
			var self=this;
			singleIllustration.set({nextUrl: nextLink});
			singleIllustration.set({prevUrl: prevLink});
			require(['views/singleDetailView'] , function(singleDetailView){
				var view = new singleDetailView({model: singleIllustration});
				self.renderViewIll(view);
				$('.singleIll').bind('load', function(){
					$(this).fadeTo('slow' , 1);
				});
			});
			
		},
		
		uploader: function(){
			var self = this;
			require(['views/uploadPanelView'] , function(uploadPanelView){
				var uploadView = new uploadPanelView({collection: self.collection});
			});
			var view = new photoCollectionView({collection: this.collection});
			view.renderB();  
		}
	});
	return photoRouter;
});