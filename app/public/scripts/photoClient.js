//Defining the photo model
var photoModel = Backbone.Model.extend({
	defaults: {
		idattribute: '_id'
	}

});
//Defining the illustration gallery collection
// this collection will be returned when it hits /api/gallery
var photoCollection = Backbone.Collection.extend({
	
	url: '/api/gallery',
	model: photoModel
});
//This will be used for the single illustration page
var singlePhotoCollection = Backbone.Collection.extend({
	
	url: '/api/singlePhoto',
	model: photoModel
});
//This view is used to create a new column with an image for every illustration
// that is within the gallery
var photoView = Backbone.View.extend({
	
	setupCol: function(){
		//Handlebar template
		var template = $("#illustrationTemplate").html();
		var compiled = Handlebars.compile(template);
		//Create the col div and append the image and link
		var col = $('<div class = "col-md-4 gallery-image"></div>');
		var aRef = $('<a href="photo/?id=' + this.model.image.created_at + '"/>');
		aRef.prepend('<img class="img-responsive" height="300" width="300" src ="' + this.model.image.url + '"/>');
		col.prepend(aRef);
		return col;
	},
	
	render: function(){
		//Create a col var, add it to the page element then return
		var col = this.setupCol();
		this.$el.html(col);
		return this;
   }
});

var photoCollectionView = Backbone.View.extend({
	//When instansisated this method is used.
	//We wait for the collection to be reset and we call on setuprow
	initialize: function(){
    this.listenTo(this.collection, "reset", this.setupRow);
 	},
 
 	render: function(row){
 		//Appending row to the element
 		this.$el.append(row);		
 		return this;
  },
  
  setupRow: function(){
	//Transfrom rowCollection to a JSON object
	var rowCollection = this.collection.toJSON();
	//Check to see if Row exisits TODO ERROR CHECKING
	if(this.collection){
		for (var j = 0; j < this.collection.length; j++){
			//Used to create a new row every 3 images
			if (j == 0 || j % 3 == 0){
				var row = $('<div class="row"></div>');
				for (var i = j; i < (3 + j); i++ ){
					if (i >= this.collection.length) break;
					//Create the row column
					var photoV = new photoView({model: rowCollection[i]});
					row.prepend(photoV.render().el);
					this.render(row);
				}
			}
		}
	}
  }

});

var photoRouter = Backbone.Router.extend({
	//Organising what methods to use when a certain url is hit
	routes: {
		// URL: Method
		"gallery": "illustrationGallery"
	},
	illustrationGallery: function(){
		var collection = new photoCollection();
	    collection.fetch({reset: true});
	    var view = new photoCollectionView({collection: collection});
	    $(".app").html(view.render().el); 
	}
});
