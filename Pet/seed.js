var mongoose = require("mongoose");
var Dog = require("./models/dog");
var Comment = require("./models/comment");

var data = [{
	dog_breed:"combai",
	dog_name:"Yankee",
	dog_age:"Twelve",
	dog_address:"183 Hutton St",
	dog_description:"A very cute and faithful dog",
	dog_vaccine:[A,c,v],
	dog_picture:"String",
	dog_postdate:"21-April-2020",
	dog_color:"Blue",
	dog_size:"12 ft",
	dog_gender:"Male"
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
