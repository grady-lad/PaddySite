define(["backbone", "handlebars", "jquery", "events"], function(Backbone, Handlebars, $, Events) {
	var singleDetailView = Backbone.View.extend({
		events: {
		"click .nextIll": "nextIllView",
		"click .prevIll": "prevIllView",
		"click .singleIll": "calcDirection"
		},
		
        render: function() {
			"use strict";
		    var template = $("#singleIllustrationTemplate").html();
		    var compiled = Handlebars.compile(template);
		    var html = compiled(this.model.attributes);
		    this.$el.html(html);
		    return this;
		},
		
		switchUrl: function(urlId){
			var id = this.model.get(urlId);
			if(id !== undefined){
				var url = "photo?id=" + id;
		    	Events.trigger("router:navigate", url);
		    }
		},

		calcDirection: function(e){
			e.preventDefault();
			var offset = $(".singleIll").offset(); 
       		var pos_x = e.pageX - offset.left;
       		var middle = $(".singleIll").outerWidth() / 2;
       		if(pos_x < middle){
           		this.switchUrl('prevUrl');
       		}
       		else
       		{
            	this.switchUrl("nextUrl");
       		}
       	}
	});
	return singleDetailView;
});
