define(["backbone","events","collections/photo","views/photoCollection"],function(e,t,n,r){var i=e.Router.extend({initialize:function(){var e=this;this._setupCollection(),t.on("router:navigate",function(t){e.navigate(t,{trigger:!0})})},routes:{gallery:"illustration",photo:"singleIll",imagepanel:"uploader"},_setupCollection:function(){var e=$("#intialContent").html();return e!=="[]"&&$(".app").append('<div class="loading"></div>'),this.collection=new n(JSON.parse(e)),this.collection},_renderView:function(e){$(".app").append(e.render().el)},renderViewIll:function(e){$(".app").html(e.render().el)},illustration:function(){$(".app").html("");var e=new r({collection:this.collection});e.renderB()},singleIll:function(e){"use strict";var t=e.split("="),n=t[1],r=this.collection.findWhere({_id:n}),i=this.collection.indexOf(r),s=this.collection.getPrevUrl(i),o=this.collection.getNextUrl(i),u=this;r.set({nextUrl:o}),r.set({prevUrl:s}),require(["views/singleDetailView"],function(e){var t=new e({model:r});u.renderViewIll(t),$(".img-centre").bind("load",function(){$(this).fadeTo("slow",1)})})},uploader:function(){var e=this;require(["views/uploadPanelView"],function(t){var n=new t({collection:e.collection})});var t=new r({collection:this.collection});t.renderB()}});return i});