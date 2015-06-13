//Our photo Model, all photos will follow this model
var photo = Backbone.Model.extend({
	//All photos have an id attribute coming from mongo 
	//But do I really need this here? Do I need to define the Image item
	// and its attributes?
	idAtrribute: "id",
});

//This collection is used to return all of our photos
var photoCollection = Backbone.Collection.extend({
	model: photo,
	url: "/api/gallery"

});

// Do not know whether we need this collection which will return the current prev
// and next image for the single illustration view. Maybe this does not need to exist
// and we can find the previous next and current illustration by looking at the photoCollection
var singlePhotoCollection = Backbone.Collection.extend({
	//Need this method to get the illustration id which will be used by our backend
	//to determine to previous next and current images. 
	initialize: function(model, options){
		this.id = options.id;
	},
	//Cannot define urls with a trailing '/' http problem? not sure
	//This funtion creates the url to get the single illustration
	url: function(){
		return "/api/photo?" + this.id;
	},
	model: photo
});

// For every illustration in a gallery we want the illustration to be
// contained in column 'col-md-4' containing a href and img.
var photoView = Backbone.View.extend({
	
	render: function(){
    	var template = $("#illustrationTemplate").html();
    	var compiled = Handlebars.compile(template);
    	//Pass the attributes to #illustrationTemplate and create the div there.
    	var html = compiled(this.model.attributes);
    	this.$el.html(html);
    	return this;
	}
 });
//For the illustration Gallery we want to create a row for every 3 images created
// I.E every row only contains 3 images.
var photoCollectionView = Backbone.View.extend({
	initialize: function(){
		//When the collection reset function is called call on the render method
    	this.listenTo(this.collection, "reset", this.render);
 	},
 	setUpRows: function(){
 	 //TODO: Move render logic into here.
 	},

 	render: function(){
 		this.$el.html("");
 		var counter = "0";
 		var row;
 		this.collection.each(function(photo){
 			//Increment a counter for every photo
 			//Create row if counter is 0 or a modulus of 3
 			if (counter == 0 || counter % 3 == 0){
 				row = $('<div class="row"></div>');
 			}
 			//Set up the image div 'col-md-4' located in illustrationTemplate
 			var photoV = new photoView({model: photo});
 			//add the photo div within our row
 			row.prepend(photoV.render().el);
 			//append the row
 			this.$el.append(row);
 			counter++;
 		}, this);
 		return this;
 	}
});

var singleIllustrationView = Backbone.View.extend({
	initialize: function(){
	//When the collection reset function is called call on the render method
	this.listenTo(this.collection, "reset", this.render);
	},
	
	render: function(){
		this.$el.html("");
		
		//Check if the 1st item in the collection is empty
		if(JSON.stringify(this.collection.at(0)).length != 2){
			var prevImage = this.collection.at(0).attributes.image.created_at;
			
		}
		
		var currentImage = this.collection.at(1);
		//Check if the last item in the collection is empty
		if(JSON.stringify(this.collection.at(2)).length != 2){
			var nextImage = this.collection.at(2).attributes.image.created_at;
			
		}
	}

	
});

//Used to manage our frontend Routes 
var photoRouter = Backbone.Router.extend({
	routes: {
		"gallery": "illustration",
		"photo": "singleIllustration"
	},
	//Gets the illustration gallery photos from the db creates the view and 
	// renders anything with .app div. 
	illustration: function() {
		var collection = new photoCollection();
		collection.fetch({reset: true});
		var view = new photoCollectionView({collection: collection});
		$(".app").html(view.render().el);   
	},
	//Used to display the single illustration @param: id = the single illustration id
	// of the illustration we would like to display.
	singleIllustration: function(id) {
		var collection = new singlePhotoCollection([], {id: id});
		collection.fetch({reset: true});
		var view = new singleIllustrationView({collection: collection});
	}
});