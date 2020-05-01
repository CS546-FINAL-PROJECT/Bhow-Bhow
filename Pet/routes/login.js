var express    = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var app = express();

var router = express.Router();
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

router.post("/login", async(req, res) =>{
    const name=req.body.username;
    const pw=req.body.password;

    var userExists=false;
    var correctPW=false;
    var user;

    try{
        user=await userData.findUser(name);
        userExists=true;
    }
    catch(e){
        userExists=false;
    } 

    try{
        if(await userData.checkPW(name,pw));
            correctPW=true;
    }
    catch(e){
        correctPW=false;
    } 

    if(userExists && correctPW) {
        let sid=uuid();

        user.sessionID=sid;

        res.cookie("AuthCookie", sid);
        res.redirect("/index");
    }
    else
    {
        res.render("User_login", {error: "Invalid Username/Password"});
    }
});

router.get("/logout", async(req,res) =>
{
    res.cookie("AuthCookie", "", {expires:new Date()});
    res.clearCookie("AuthCookie");
    res.render("User_login", {title:"You have been logged out"});
});

router.post('/Users_register',login.register);
router.post('/Users_login',login.login)
app.use('/api', router);
app.listen(3000);
