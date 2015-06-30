define(["backbone", "models/photo"], function(Backbone, Photo) {
  return Backbone.Collection.extend({
	  model: Photo,
	  url: "/gallery"
  });
});