var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose"); 

var advertiserSchema = new mongoose.Schema({
		username:String,
		advertiser_firstName:String,
		advertiser_lastName:String,
	    advertiser_email:String,
		advertiser_userPassword:String,
		advertiser_cellphone:String,
		advertiser_address:String,
		advertiser_dogList:String
	});
advertiserSchema.methods.authenticate = function(password) {      
		return this.password === this.hashPassword(password);
	  };
advertiserSchema.plugin(passportLocalMongoose); 
module.exports = mongoose.model("Advertiser",advertiserSchema);
