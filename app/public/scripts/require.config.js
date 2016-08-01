require.config({
  baseUrl: "/scripts",
  paths: {
    jquery: "lib/jquery",
    backbone: "lib/backbone",
    underscore: "lib/underscore",
    handlebars: "lib/handlebars",
    bootstrap: "lib/bootstrap.min",
    helper: "lib/custom/helper"
  },
  shim: {
    backbone: {
    deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    underscore: {
      exports: "_"
    },
    handlebars: {
      exports: "Handlebars"
    },
    bootstrap:{
    	deps :["jquery"]
    }
  },
})

require(["jquery", "bootstrap", "helper"])
