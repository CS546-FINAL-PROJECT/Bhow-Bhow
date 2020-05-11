const express = require('express');
const session = require('express-session');
var ejs = require('ejs')
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
const path = require('path');
const passport = require('passport');
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const Advertiser = require("./models/advertiser")

const app = express();

const configRoutes = require('./routes');


var url = process.env.DATABASEURL || "mongodb://localhost/dogAdoption";
mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true });
app.use(express.static(__dirname + '/views'));

app.engine('html', ejs.__express);
app.set('view engine', 'html');


app.use(bodyParser.urlencoded({ extended: true }));

//  session 
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Stragety for user

passport.use('User',new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password' // this is the virtual field on the model
},	
	function(username, password, done) {
		User.findOne({ username: username }, function (err, user) {
		  if (err) { return done(err); }
		  if (!user) {
			return done(null, false, { message: 'Incorrect username.' });
		  }
		  if (!user.authenticate(password)) {
			return done(null, false, { message: 'Incorrect password.' });
		  }
		  return done(null, user);
		});
}));
// Stragety for advertiser

passport.use('Adevrtiser',new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password' // this is the virtual field on the model
},	
	function(username, password, done) {
		Advertiser.findOne({ username: username }, function (err, user) {
		  if (err) { return done(err); }
		  if (!user) {
			return done(null, false, { message: 'Incorrect username.' });
		  }
		//   console.log(user);
		  if (!user.authenticate(password)) {
			return done(null, false, { message: 'Incorrect password.' });
		  }
		  return done(null, user);
		});
}));


app.use(require("express-session")({    
	secret:"Hello World, this is a session",    
	resave: false,    
	saveUninitialized: false
}));


configRoutes(app);


app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});                                                                                                
