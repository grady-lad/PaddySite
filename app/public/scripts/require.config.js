require.config({
  baseUrl: '/scripts',
  paths: {
    jquery: 'lib/jquery',
    backbone: 'lib/backbone',
    underscore: 'lib/underscore',
    handlebars: 'lib/handlebars',
    bootstrap: 'lib/bootstrap.min',
    jqueryUI: 'lib/jquery.ui.widget',
    jqueryIframe: 'lib/jquery.iframe-transport',
    jqueryFileupload: 'lib/jquery.fileupload',
    jqueryCloudinary: 'lib/jquery.cloudinary',
    helper: 'lib/custom/helper'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    bootstrap:{
    	deps :['jquery']
    },
    jqueryCloudinary: {
    	exports: 'cloudinary'
    }
  },
});

require(["init", "jquery", "bootstrap", "jqueryCloudinary", "helper"]);