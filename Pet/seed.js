
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
	dog_name:"Stanford",
	dog_age:"16 monthes",
	dog_address:"183 Hutton St",
	dog_description:"Very smart, confident, good-natured companions. Their courage is proverbial",
	dog_vaccine:["Distemper","Parvovirus"],
	dog_picture:"https://vetstreet.brightspotcdn.com/dims4/default/94fc9d8/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fc5%2Fe57d80a71811e0a0d50050568d634f%2Ffile%2FAmerican-Staffordshire-Terrier-3-645mk070411.jpg",
	dog_postdate:"25-April-2020",
	dog_color:"Yellow",
	dog_size:"14 ft",
	dog_gender:"Male"
},
{
    dog_breed:"Golden Retriever",
    dog_name:"Sparky",
    dog_age:"2 years",
    dog_address:"1 Castle Point terrace",
    dog_description: "Loyal and playful companion",
    dog_vaccine:["Parvovirus"],
    dog_picture: "",
    dog_postdate: "11-January-2020",
    dog_color: "Golden",
    dog_size: "12 ft",
    dog_gender: "Female"
},
{
    username: "Dogluvr1979",
    password: "pa$$word",
    user_email: "Dolores19@gmail.com",
    user_gender: "Female",
    user_address: "1277 Hogwarts Place",
    user_age: "26",
    favoriteList: ["Sparky", "Yankee"]

},
{
    username: "Catssuck301",
    password: "password123",
    user_email: "Metsfan192@gmail.com",
    user_gender: "Male",
    user_address: "19 Trinity Way",
    user_age: "52",
    favoriteList: ["KiKi", "Stanford"]

},
{
    username: "Skaterboy1999",
    password: "PopPunkLyfe",
    user_email: "MikeyWay@gmail.com",
    user_gender: "Male",
    user_address: "14 Parade Street",
    user_age: "35",
    favoriteList: ["Stanford", "Yankee"]

},
{
        username: "Veterinarian192",
		advertiser_firstName: "John",
		advertiser_lastName:"Salazar",
	    advertiser_email:"DocJohn@gmail.com",
		advertiser_userPassword:"Vet1999!",
		advertiser_cellphone:"732-288-2819",
		advertiser_address:" 1 Wizardly Way",
        advertiser_dogList:["Yankee", "Stanford"]
},
{
        username: "Pet_foodislyfe",
		advertiser_firstName: "Sarah",
		advertiser_lastName:"Connor",
	    advertiser_email:"terminator@gmail.com",
		advertiser_userPassword:"EliminateHumanz",
		advertiser_cellphone:"732-199-7927",
		advertiser_address:" 1991 Myrtle Lane",
        advertiser_dogList:["Sparky"]
},
{
        username: "ObedienceMastah",
		advertiser_firstName: "George",
		advertiser_lastName:"Martin",
	    advertiser_email:"Tolkeinluvr@gmail.com",
		advertiser_userPassword:"IceKing192",
		advertiser_cellphone:"201-999-1629",
		advertiser_address:" 12 Felicity Street",
        advertiser_dogList:["Stanford"]

}
];

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
