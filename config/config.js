var config = module.exports;
process.env.NODE_ENV === "development";

config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: "127.0.0.1"
};

config.default = {
	root: ""
}




