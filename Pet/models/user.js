var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
		username:String,
		password:String,
		email:String,
		gender:String,
		address:String,
		age:String,
		favoriteList:[]
	});

module.exports = mongoose.model("User",userSchema);
