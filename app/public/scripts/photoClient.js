var photo = Backbone.Model.extend({
idAtrribute: "id",
});

var photoCollection = Backbone.Collection.extend({
model: photo,
url: "/api/gallery"

  });

var photoView = Backbone.View.extend({


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
 render: function(){
    this.$el.html("");
    var counter = "0";
    var row;
    this.collection.each(function(photo){
    	console.log("counter is " + counter);
    	if (counter == 0 || counter % 3 == 0){
    		console.log("counter here is " + counter);
    		console.log("moduls");
    		row = $('<div class="row"></div>');
    	}
    	var photoV = new photoView({model: photo});
    	row.prepend(photoV.render().el);
    	this.$el.append(row);
    	counter++;
    }, this);
    return this;
  }
 });

 var photoRouter = Backbone.Router.extend({
 routes: {
 "gallery": "illustration"
 },
 illustration: function() {
    var collection = new photoCollection();
    collection.fetch({reset: true});
    //IF I ADD THIS ALERT THE COLLECTION IS NOW DEFINED?
    //alert(collection);
    console.log(collection);
    var view = new photoCollectionView({collection: collection});
    $(".app").html(view.render().el);   
 }
});