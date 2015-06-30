define(["backbone", "handlebars", "jquery", "events"], function(Backbone, Handlebars, $, Events) {
	var singleDetailView = Backbone.View.extend({
		events: {
		"click .nextIll": "nextIllView",
		"click .prevIll": "prevIllView"
		},
		
        render: function() {
		    var template = $("#singleIllustrationTemplate").html();
		    var compiled = Handlebars.compile(template);
		    var html = compiled(this.model.attributes);
		    console.log("And the attributes are : ");
		    console.log(this.model.attributes)
		    this.$el.html(html);
		    return this;
		},
		
		prevIllView: function(e) {
			e.preventDefault();
			
			var id = this.model.get("prevUrl");
			var url = "photo?id=" + id;
		    Events.trigger("router:navigate", url);
		},
		
		nextIllView: function(e) {
			e.preventDefault();
			
			var id = this.model.get("nextUrl");
			var url = "photo?id=" + id;
		    Events.trigger("router:navigate", url);
		}
	});
	return singleDetailView;
});
