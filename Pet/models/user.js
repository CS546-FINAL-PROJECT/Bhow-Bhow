var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose"); 


var UserSchema = new mongoose.Schema({
	username:String,
	password:String,
	user_email:String,
	user_gender:String,
	user_address:String,
	user_age:String,
	favoriteList:[]
});

UserSchema.methods.authenticate = function(password) {      
	return this.password === this.hashPassword(password);
  };
// UserSchema.plugin(uniqueValidator);
// UserSchema.methods.validPassword = function(password) {
// 	return bcrypt.compareSync(password, this.passwordHash);
//   };
UserSchema.plugin(passportLocalMongoose); 
module.exports = mongoose.model("User",UserSchema);



