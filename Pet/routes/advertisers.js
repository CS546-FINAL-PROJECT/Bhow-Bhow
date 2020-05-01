var express = require("express");
var router = express.Router();
var Dog = require("../models/advertiser.js");
var request = require("request");

// Show the home page with all advertiser infomation
router.get("/",function(req,res){
	advertisers.find({},function(err,allAdvertiser){
		if(err)
			console.log(err);
		else
			res.render("index",{dogs:allAdvertiser});
	})
})

// create new_advertiser to the DB
router.post("/",function(req,res){
                var advertiser_firstName = req.body.advertiser_firstName;
		var advertiser_lastName = req.body.advertiser_lastName;
	        var advertiser_email= req.body.advertiser_email;
		var advertiser_userPassword = req.body.advertiser_userPassword;
		var advertiser_cellphone = req.body.advertiser_cellphone;
		var advertiser_address = req.body.advertiser_address;
		var advertiser_dogList = req.body.advertiser_dogList;

	var newAdvertiser = {
                 advertiser_firstName:advertiser_firstName,
		 advertiser_lastName:advertiser_lastName,
	         advertiser_email:advertiser_email,
		 advertiser_userPassword:advertiser_userPassword,
		 advertiser_cellphone:advertiser_cellphone,
		 advertiser_address:advertiser_address,
		 advertiser_dogList:advertiser_dogList,
	};
	Advertiser.create(newAdvertiser,function(err,newlycreated){
		if(err)
			console.log(err);
		else
			res.redirect("/advertisers");
	})

});

// show form to create a new_advertiser

router.get("/new",function(req,res){
	res.render("new_advertiser");
});


// Show the specific dog page
router.get("/:id",function(req,res){
	Dog.findById(req.params.id).populate("comments").exec(function(err,foundDog){
		if(err)
			console.log(err);
		else{
			res.render("dogs/dog_page",{dog:foundDog});
		}
	});
});

// Delete the advertisers info
router.delete("/:id",function(req,res){
Advertiser.findByIdAndRemove(req.params.id,function(err){
		if(err)
			res.redirect("/advertisers");
		else
			res.redirect("/advertisers");
	})
});

// Update the advertisers page
router.put("/:id",function(req,res){
	Advertiser.findByIdAndUpdate(req.params.id,function(err){
		if(err)
			res.redirect("/advertisers");
		else
			res.redirect("/advertisers/" + req.params.id);
	})
});

module.exports = router;



