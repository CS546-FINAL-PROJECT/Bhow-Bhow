var express = require("express");
var router = express.Router();
var Dog = require("../models/dog.js");
var Comment = require("../models/comment.js");

// show comment
router.get("/new",function(req,res) {
	Dog.findById(req.params.id,function(err,foundDog){
		if(err)
			console.log(err);
		else
			res.render("comment/new_comment",{dog:foundDog});
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
			Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err);
				else
					{
				comment = {
					user_name:req.params.user_name,
					comment:req.params.comment
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

router.get("/:comment_id/edit", function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
	   if(err){
		   res.redirect("back");
	   } else {
		 res.render("comments/edit", {dog_id: req.params.id, comment: foundComment});
	   }
	});
 });

 module.exports = router;
