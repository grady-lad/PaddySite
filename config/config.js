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
            			port: process.env.EXPRESS_PORT || 3000,
            			ip: "hidden-falls-6850.herokuapp.com",
            			mongodburl: "mongodb://staging"
            		};
    }
};



