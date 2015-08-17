define(["backbone", "models/photo"], function(Backbone, Photo) {
  return Backbone.Collection.extend({
	  model: Photo,
	  url: "/gallery",
	  
	  getPrevUrl: function(index){
		  if(index >= 1){
			  return this.at(index - 1).get('_id');
		  }else{
			  return undefined;
		  }
	  },
	  
	  getNextUrl: function(index){
		  if(index + 1 !== this.length){
			  return this.at(index + 1).get('_id');
		  }else{
			  return undefined;
		  }
	  }
  });
});