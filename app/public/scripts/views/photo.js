define(["backbone", "handlebars", "jquery", "events"], function(Backbone, Handlebars, $, Events) {
	var photoView = Backbone.View.extend({
		
		events: {
		"click .singleIllLink": "singleIllView",
	    "submit .remove": "removePhoto"
		},
		render: function(){
			var template = $("#illustrationTemplate").html();
			var compiled = Handlebars.compile(template);
			//Pass the attributes to #illustrationTemplate and create the div there.
			var html = compiled(this.model.attributes);
			this.$el.html(html);
			return this;
		},
		//When a model is clicked we to navigate to '/photo?id='
		// and let our router do the rest :)
		singleIllView: function(e){
			e.preventDefault();
			//var id = this.model.get("image").created_at;
			var id = this.model.get("_id");
			//router.navigate("photo?id=" + id, {trigger: true});
			var url = "photo?id=" + id;
		    Events.trigger("router:navigate", url);
		},
		
		removePhoto: function(e){
			e.preventDefault();
			Events.trigger("roueter:navigate", "/removeImage");
		}

	});
	return photoView;
});