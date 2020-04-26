var express = require("express");
var router = express.Router();
var Dog = require("../models/dog.js");
var advertiser = require("../models/advertisers.js");

// show advertiser
router.get("/new",function(req,res) {
	Dog.findById(req.params.id,function(err,foundDog){
		if(err)
			console.log(err);
		else
			res.render("advertisers/new_advertiser",{dog:foundDog});
	})
})

// create comment
router.post("/",function(req,res){
	Dog.findById(req.params.id,function(err,foundDog){
		if(err){
			console.log(err);
			res.redirect("/dog");
		}
		else{
			advertiser.create(req.body.advertisers,function(err,advertisers){
				if(err)
					console.log(err);
				else
					{
				advertisers = {
    advertiser_id:req.params.advertiser_id,
		advertiser_firstName:req.params.advertiser_firstName,
		advertiser_lastName:req.params.advertiser_lastName,
	  advertiser_email:req.params.advertiser_email,
		advertiser_userPassword:req.params.advertiser_userPassword,
		advertiser_cellphone:req.params.advertiser_cellphone,
		advertiser_address:req.params.advertiser_address,
		advertiser_dogList:req.params.advertiser_dogList
				}
				foundDog.comments.push(comment);
				foundDog.save();
				res.redirect("/dog/" + foundDog._id);
					}	
			});
		}		
	})
});
// Edit route

router.get("/:advertiser_id/edit", function(req, res){
	Comment.findById(req.params.advertiser_id, function(err, foundAdvertisement){
	   if(err){
		   res.redirect("back");
	   } else {
		 res.render("advertisers/edit", {advertiser_id: req.params.id, advertisers: foundAdvertisement});
	   }
	});
 });

 module.exports = router;
