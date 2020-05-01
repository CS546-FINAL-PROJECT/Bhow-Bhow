const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function findUser(username){
    for(let i=0; i<users.length; i++)
    {
        if(users[i].username===username)
            return users[i]
    }
    
    throw false;
}

async function findUserBySID(sid){
    for(let i=0; i<users.length; i++)
    {
        if(users[i].sessionID===sid)
            return users[i]
    }
    
    throw false;
}

async function checkPW(user,password){
    try{
        var theUser=await findUser(user);
    }
    catch(e){
        throw false;
    }


    if(await bcrypt.compare(password, theUser.hashedPassword)){
        return true;
    }
    else{
        throw false;
    }

}

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
});
var User = mongoose.model('User', UserSchema);

if (req.body.email &&
  req.body.username &&
  req.body.password &&
  req.body.passwordConf) {
  var userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  }

  User.create(userData, function (err, user) {
    if (err) {
      return next(err)
    } else {
      return res.redirect('/index');
    }
  });
}
module.exports=
{
    findUser,
    checkPW,
    findUserBySID,
    User
};
