const express = require("express");
const router = express.Router();
const xss = require("xss");

const users = require("../data/users");

// const users = data.users;
// const comments = data.comments;


const checkUserLogin = require("../middlewares/check").checkUserLogin;


router
  .get("/register", async (req, res) => {

    res.render("Users/user_register")
  })
  .post("/register",async (req, res) => {

    const advInfo = req.body;
    let name = xss(advInfo.name);
    let password = xss(advInfo.password);
    let email = xss(advInfo.email);
    let gender = xss(advInfo.gender);
    let city = xss(advInfo.city);
    let state = xss(advInfo.state);
    let age;
 

    if (!name) {
      res.render("Users/user_register",{error:"Please provide the name."});
      return;
    }
    if (!email) {
      res.render("Users/user_register",{error:"Please provide an email."});
      return;
    }

    if (!password) {
      res.render("Users/user_register",{error:"Please provide an password."});
      return;
    }

    if (!gender) {
      res.render("Users/user_register",{error:"Please provide the gender."});
      return;
    }
    if (!city) {
      res.render("Users/user_register",{error:"Please provide a city name."});
      return;
    }
    if (!state) {
      res.render("Users/user_register",{error:"Please provide a state name."});
      return;
    }
    if (/^\d+$/.test(xss(advInfo.age))) {
      age = parseInt(xss(advInfo.age));
    } else {
        res.render("Users/user_register",{error:"Please provide an integer."});
      return;
    }
    try {
      userData = await users.registar(
        name,
        password,
        email,
        gender,
        city,
        state,
        age
      );
      req.session.identity = {
        id: userData._id,
        identity: "uesr"
      };

      res.redirect("/BhowBhow");

    } catch (e) {
      res.render("Users/user_register",{error:e});

    }
  });

router
  .get("/login",async (req, res) => {

    res.render("Users/user_login");
  })
  .post("/login",async (req, res) => {

    const advInfo = req.body;

    let email = xss(advInfo.email);
    let password = xss(advInfo.password);
    if (!email) {

        res.render("Users/user_login",{error:"Please provide the email."});
      return;
    }

    if (!password) {

      res.render("Users/user_login",{error:"Please provide the email."});
      return;
    }

    try {
      userData = await users.login(email, password);
      // console.log(userData);

      req.session.identity = {
        id: userData._id,
        identity: "uesr"
      };

      res.render("Users/user_center.handlebars",{
        id:userData._id,
        name:userData.name,
        email:userData.email,
        gender:userData.gender,
        city:userData.city,
        state:userData.state,
        age:userData.age,
        favoriteList:userData.favoriteList
      })
    } catch (e) {
      res.render("Users/user_login",{error:e});
      // res.status(500).json({ error: e });
    }
  });
router.get("/favouritelist",checkUserLogin,async(req,res) =>{
  res.render("Users/User_center_favouritelist");
})

router
  .get("/center/:id", checkUserLogin,async (req, res) => {
    // res.send('Questions create Page');
    // res.json()
    // res.json({ desp: "center page of the user" });
    var user = users.getById(req.params.id);

    res.render("Users/user_center",{name:user.name,
                      email:user.email,gender:user.gender,
                      age:user.age,state:user.state,city:user.city
      });
  });

module.exports = router;
