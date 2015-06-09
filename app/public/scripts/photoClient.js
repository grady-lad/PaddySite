var photoModel = Backbone.Model.extend({
	defaults: {
		idattribute: '_id'
	}

});

var photoCollection = Backbone.Collection.extend({
	
	url: '/api/gallery',
	model: photoModel
});

var photoView = Backbone.View.extend({

tagName: "li",
className: "photo",
render: function(){
    var template = $("#illustrationTemplate").html();
    var compiled = Handlebars.compile(template);
    var html = compiled(this.model.attributes);
    this.$el.html(html);
    return this;

   }
 });

 var photoCollectionView = Backbone.View.extend({
 initialize: function(){
    this.listenTo(this.collection, "reset", this.render);
 },
 tagName: "row",
 render: function(){
	 
	if(this.collection){
		for (var j = 0; j < this.collection.length; j++){
			if (j == 0 || j % 3 == 0){
				 //create me an element row
				// loop again
				// check if j is greater than collection.row
				//call on model view where our column will be created with image and link
				console.log("hey good looking");
			}
		}		
	}
	
   this.$el.html("");
    this.collection.each(function(photo){
      var photoV = new photoView({model: photo});
        this.$el.append(photoV.render().el);
	}, this);
    return this;
  }
 });

var photoRouter = Backbone.Router.extend({
	routes: {
		"gallery": "init"
	},
	init: function(){
		var collection = new photoCollection();
	    collection.fetch({reset: true});
	    var view = new photoCollectionView({collection: collection});
	    $(".app").html(view.render().el); 
	}
});
