define(["backbone", "handlebars"], function(Backbone, Handlebars) {
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
	return singleDetailView;
});
