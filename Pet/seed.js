var mongoose = require("mongoose");
var Dog = require("./models/dog");
var Comment = require("./models/comment");

var data = [{
	dog_breed:"String",
	dog_name:"String",
	dog_age:"String",
	dog_address:"String",
	dog_description:"String",
	dog_vaccine:[],
	dog_picture:"String",
	dog_postdate:"String",
	dog_color:"String",
	dog_size:"String",
	dog_gender:"String"
}];

function seedDB(){
    Dog.remove({},function(err){
		if(err)
			console.log(err);
	console.log("remove dogs");
    data.forEach(function(seed){
        console.log(seed);
        Dog.create(seed,function(err,dog){
            if(err)
                console.log(err);
            else
            {
                console.log("added a new campground");
					Comment.create({
						user_name: "this is a greate place",
						comment: "Vincent"
					},function(err,comment){
						if(err)
							console.log(err);
						else
						{
							dog.comments.push(comment);
							dog.save();
							console.log("created a new comment");
						}
					});
            }
        })
    })
});
}
module.exports = seedDB;
