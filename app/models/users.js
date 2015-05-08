var mongoose=require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//Define the schema for the user model
var Schema=mongoose.Schema;
 
var userSchema = new Schema({
	
	  local   : {
	  email   : String,
	  password: String
  }

});

//=======================
//Methods
//=======================

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
 
module.exports = mongoose.model('User', userSchema);
