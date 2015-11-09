define(["backbone", "handlebars", "events"], function(Backbone, Handlebars, Events) {
	var singleDetailView = Backbone.View.extend({
	
		events: {
		"click .singleHolder": "calcDirection"
		},

    render: function() {
		  "use strict";
		  var template = $("#singleIllustrationTemplate").html();
		  var compiled = Handlebars.compile(template);
		  var html = compiled(this.model.attributes);
		  this.$el.html(html);
		  return this;
		},
		
		calcDirection: function(e){
			e.preventDefault();
			var current = $('.singleHolder');
			var offset = current.offset(); 
      var pos_x = e.pageX - offset.left;
      var middle = current.outerWidth() / 2;
      pos_x < middle ? this.showNext('-300px' , 'prevUrl') : this.showNext('300px' , 'nextUrl');
    },

    showNext: function(pos, urlId){
      var id = this.model.get(urlId);
      var hide;
      if(id === undefined ){
        hide = document.getElementById(urlId);
        return;
      }
      $('.singleIll').animate({left: pos, opacity: '0'}, function(){
		    var url = "photo?id=" + id;
		    Events.trigger("router:navigate", url);
      });
    }
	});
	return singleDetailView;
});
