const express = require("express");
const router = express.Router();

// const checkLogin = require("../middlewares/check").checkLogin;


const checkAdminLogin = require('../middlewares/check').checkAdminLogin;
const data = require("../data");
const questions = data.questions;
const quizzes = data.quizzes;
const xss = require("xss");
const admin = data.admin;
const advertiser = data.advertisers;
const user = require("../data/users");

router.get("/", checkAdminLogin, async (req, res) => {

  res.redirect("/BhowBhowAdmin/showUsers");

});

router.get("/showDogs",checkAdminLogin,async (req,res)=>{
  var dogs = await admin.getAllDogs();
  res.render("Admin/admin_dogs_table",{
      dogs:dogs
  });
});


//////////////////User
router.get("/showUsers",checkAdminLogin,async (req,res) =>{


  const users = await admin.getAllUsers();
  res.render("Admin/admin",{users:users});
})

router.delete("/showUsers",async(req,res) =>{
  let id = req.params.id;
  const info = await admin.deleteUserByID(id);
  res.redirect("/showUsers");
});

router.get("/user/:id",checkAdminLogin,async(req,res)=>{

  
  var updateUser = await user.getById(req.params.id);

  res.render("Admin/admin_userupdate",{name:updateUser.name,
                        email:updateUser.email,
                        gender:updateUser.gender,
                        age:updateUser.age,
                        city:updateUser.city,
                        state:updateUser.state,
                        id:updateUser._id,
                        updatecss:true
  });
});



router.get("/showComments",checkAdminLogin,async(req,res)=>{


  const comments = await admin.getAllComments();
  res.render("Admin/admin_comments_table",{comments:comments});
});



/////////////////Adevrtiser
router.get("/showAdvertisers",checkAdminLogin,async (req,res)=>{

const advertisers = await admin.getAllAdvertisers();
res.render("Admin/admin_advertiser_table",{advertisers:advertisers});
});

router.get("/advertiser/:id",async(req,res)=>{

  var updateAdvertiser = await advertiser.getById(req.params.id);


  res.render("Admin/admin_advertiserupdate",{firstName:updateAdvertiser.firstName,
                        lastName:updateAdvertiser.lastName,
                        email:updateAdvertiser.email,
                        address:updateAdvertiser.address,cellphone:updateAdvertiser.cellphone,
                        id:updateAdvertiser._id,
                        updatecss:true
  });
});





router.put("/advertiser/:id",async(req,res)=>{
  
  let email = req.body.email;
  let password = req.body.password;
  if (!password) {
    res
      .status(400)
      .json({ error: "Please provide the password." })
      .end();
    return;
  }
  if (!email) {
    res
      .status(400)
      .json({ error: "Please provide the email." })
      .end();
    return;
  }

  try{

    const newAdvertiser = await admin.updateAdvertiser(req.params.id,email,password);
    res.redirect("/BhowBhowAdmin/showAdvertisers")

  }catch(e){
    req.flash("error",e);
    res.redirect("/BhowBhowAdmin/advertiser/{{req.params.id}}");

  }

});

router.get("/showComments",async(req,res)=>{


  const comments = await admin.getAllComments();
  res.render("Admin/admin_comments_table",{comments:comments});
});


router.get("/advertiser/delete/:id",async(req,res)=>{
    try{
      await admin.deleteAdvertiserByID(req.params.id);
      res.redirect("/BhowBhowAdmin/showAdvertisers");
    }catch(e){
      req.flash("error",e);
      res.redirect("/BhowBhowAdmin/showAdvertisers");

    }
});
router.get("/user/delete/:id",async(req,res)=>{
  try{
    await admin.deleteUserByID(req.params.id);
    res.redirect("/BhowBhowAdmin/showUsers");
  }catch(e){
    req.flash("error",e);
    res.redirect("/BhowBhowAdmin/showUsers");
 
  }
});
router.get("/dog/delete/:id",async(req,res)=>{
  try{
    await admin.deleteAdvertiserByID(req.params.id);
    res.redirect("/BhowBhowAdmin/showDogs");
  }catch(e){
    req.flash("error",e);
    res.redirect("/BhowBhowAdmin/showDogs");
  }
});

router
  .get("/login", async (req, res) => {

    try{
      res.render("Admin/admin_login",);
    }catch(e){
      res.render("Admin/admin_login",{error:e});
    }
    
  })
  .post("/login", async (req, res) => {

    const advInfo = req.body;
    let email = xss(advInfo.email);
    let password = xss(advInfo.password);

    if (!email) {
      res
        .status(400)
        .json({ error: "Please provide the email." })
        .end();
      return;
    }

    if (!password) {
      res
        .status(400)
        .json({ error: "Please provide the password." })
        .end();
      return;
    }


    try {
      var currentAdmin = await admin.login(email, password);
      req.session.identity = {
        id: currentAdmin._id,
        identity: "admin"
      };


      res.redirect("/BhowBhow");    //Admin page

    } catch (e) {
      res.render("Admin/admin_login",{error:e});
    }
  });


router
  .get("/center", async (req, res) => {

    res.render("Admin/admin");

  });





module.exports = router;
