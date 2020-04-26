var mongoose = require("mongoose");

var advertiserSchema = new mongoose.Schema({
	        advertiser__id:String,
		advertiser_firstName:String,
		advertiser_lastName:String,
	        advertiser_email:String,
		advertiser_userPassword:String,
		advertiser_cellphone:String,
		advertiser_address:String,
		advertiser_dogList:String
	});

module.exports = mongoose.model("Advertiser",advertiserSchema);
