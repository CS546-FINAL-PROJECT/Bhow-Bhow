
var Dog = require("./models/dog");
var Comment = require("./models/comment");
var Dog = require("./models/dog")

var data = [{
	dog_breed:"combai",
	dog_name:"Yankee",
	dog_age:"12 monthes",
	dog_address:"183 Hutton St",
	dog_description:"A very cute and faithful dog",
	dog_vaccine:["Distemper","Parvovirus","Parainfluenza"],
	dog_picture:"https://www.dogbreedinfo.com/images31/CombaiBoarhoundDogRareBreedIndiaTiger2YearsOldSideView.jpg",
	dog_postdate:"21-April-2020",
	dog_color:"Yellow",
	dog_size:"12 ft",
	dog_gender:"Male"
},{
	dog_breed:"Alaskan Malamute",
	dog_name:"Kiki",
	dog_age:"4 monthes",
	dog_address:"52 11th St,Hoboken",
	dog_description:"An affectionate, loyal, and playful but dignified dog",
	dog_vaccine:["Parvovirus","Parainfluenza"],
	dog_picture:"https://vetstreet.brightspotcdn.com/dims4/default/e1bbd79/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F82%2F071660a40111e087a80050568d634f%2Ffile%2FAlaskan-Malamute-3-605mk062311.jpg",
	dog_postdate:"20-April-2020",
	dog_color:"White and Pink",
	dog_size:"12 ft",
	dog_gender:"Male"
},{
	dog_breed:"American Staffordshire Terrier ",
	dog_name:"Yankee",
	dog_age:"16 monthes",
	dog_address:"183 Hutton St",
	dog_description:"Very smart, confident, good-natured companions. Their courage is proverbial",
	dog_vaccine:["Distemper","Parvovirus"],
	dog_picture:"https://vetstreet.brightspotcdn.com/dims4/default/94fc9d8/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fc5%2Fe57d80a71811e0a0d50050568d634f%2Ffile%2FAmerican-Staffordshire-Terrier-3-645mk070411.jpg",
	dog_postdate:"25-April-2020",
	dog_color:"Yellow",
	dog_size:"14 ft",
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
seedDB();
module.exports = seedDB;
