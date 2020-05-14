const express = require("express");
const router = express.Router();

const data = require("../data");
const dogs = require("../data/dogs");
const candidates = data.candidates;
const creators = data.creators;
const quizzes = data.quizzes;
const xss = require("xss");

// const checkNotLogin = require('../middlewares/check').checkNotLogin;
// checkNotLogin, 
router.get("/", async (req, res) => {
 
  
    res.redirect("/BhowBhow");
  });
router.get("/BhowBhow",async (req, res) => {


    var alldogs = await dogs.listAll();
    // if(res.session.identity === 'user')
    res.render("Mainpage/index",{
        title: "Home Page",
        HOMEPAGE_CSS: true,
        dogs:alldogs
    });
});


router.get("/contact",async (req,res) =>{
    res.render("Mainpage/contact");
});

module.exports = router;