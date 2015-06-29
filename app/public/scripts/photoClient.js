//Our photo Model, all photos will follow this model
var photo = Backbone.Model.extend({
	//All photos have an id attribute coming from mongo 
	//But do I really need this here? Do I need to define the Image item
	// and its attributes?
	idAtrribute: "_id",
	imageAttribute: "image"
});

//This collection is used to return all of our photos
var photoCollection = Backbone.Collection.extend({
	model: photo,
	url: "/gallery"

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
	
	events: {
    "click .singleIllLink": "singleIllView"
  	},
	render: function(){
  		//console.log(this.model);
    	var template = $("#illustrationTemplate").html();
    	var compiled = Handlebars.compile(template);
    	//Pass the attributes to #illustrationTemplate and create the div there.
    	var html = compiled(this.model.attributes);
    	console.log(this.model.attributes);
    	this.$el.html(html);
    	return this;
	},
	//When a model is clicked we to navigate to '/photo?id='
	// and let our router do the rest :)
	singleIllView: function(e){
		e.preventDefault();
		//var id = this.model.get("image").created_at;
		var id = this.model.get("_id");
		router.navigate("/photo?id=" + id, {trigger: true});
	}

 });

var singlePhotoView = Backbone.View.extend({
	
	render: function(){
		console.log("this model");
		console.log(this.model.photos);
		var template = $("#singleillustrationTemplate").html();
		var compiled = Handlebars.compile(template);
		//Pass the attributes to #illustrationTemplate and create the div there.
		var html = compiled(this.model.photos);
		this.$el.html("");
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
 		//NOTE FINAL ROW CONTAINS NEWEST IMAGES
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

var singleDetailView = Backbone.View.extend({
  render: function() {
    var template = $("#singleIllustrationTemplate").html();
    var compiled = Handlebars.compile(template);
    var html = compiled(this.model.attributes);
    console.log("And the attributes are : ");
    console.log(this.model.attributes)
    this.$el.html(html);
    return this;
  }
});

//Used to manage our frontend Routes 
var photoRouter = Backbone.Router.extend({
	
	initialize: function() {
		this._setupCollection();
	},

	routes: {
		"gallery": "illustration",
		"photo": "singleIll"
	},
	
	_setupCollection: function() {
		if(this.collection) return;
		var data = $("#intialContent").html();
		this.collection = new photoCollection(JSON.parse(data));
	},
	
	_renderView: function(view) {
		$(".app").html(view.render().el);
	},

	//Gets the illustration gallery photos from the db creates the view and 
	// renders anything with .app div. 
	illustration: function() {
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