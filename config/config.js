"use strict";

module.exports = function(){
  switch(process.env.NODE_ENV){
    case 'development':
      return	{
        port: process.env.EXPRESS_PORT || 3000,
        ip: "127.0.0.1",
        mongodburl: "mongodb://localhost/paddysdb"
      };
    case 'production':
      return {
        port: process.env.EXPRESS_PORT || 5000,
        ip: "hidden-falls-6850.herokuapp.com",
        mongodburl: "mongodb://heroku_jmtqwb0j:tpkgugqvenu87jeh0i8gfk7i5f@ds047622.mongolab.com:47622/heroku_jmtqwb0j"
      };
    case 'test':
      return {
        port: process.env.EXPRESS_PORT || 5000,
        ip: "127.0.0.1",
        mongodburl: "mongodb://testhost/testdbname"
      };
  }
};



