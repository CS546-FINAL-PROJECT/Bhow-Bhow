const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");
const User = require("../model/User");
// test route
async function isAuth(req){
    try{
        var user=await userData.findUserBySID(req.cookies.AuthCookie);

        if (req.cookies.AuthCookie!==undefined && req.cookies.AuthCookie==user.sessionID && user.sessionID!==undefined)
        {

            return true;
        }
        else
        {
            return false;
        }
    }
    catch(e)
    {
        return false;
    }

}

router.get("/", async(req, res) =>{
    if(await isAuth(req)===true)    {
        res.redirect("/index");
    }
    else {
        res.render("Users_login");
    }
});
router.post("/register", async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            username,
            email,
            password,
            gender,
            address,
            age
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                username,
                email,
                password,
                gender,
                address,
                age
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.post("/login", async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { email, password } = req.body;
      try {
        let user = await User.findOne({email});
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
  
        if(user && isMatch) {
            let sid=uuid();
    
            user.sessionID=sid;
    
            res.cookie("AuthCookie", sid);
            req.session.user = { username:user.username, email: user.email};

            res.redirect("/index");
        }
  
        
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );

router.get("/logout", async(req,res) =>
{
    res.cookie("AuthCookie", "", {expires:new Date()});
    res.clearCookie("AuthCookie");
    res.render("User_login", {title:"You have been logged out"});
});

 router.get("/me", auth, async (req, res) => {
    try {
       const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });
module.exports = router;
