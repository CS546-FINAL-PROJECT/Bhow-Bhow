const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
const path = require('path');


const app = express();

const configRoutes = require('./routes');
const handlebarsInstance = exphbs.create({
	defaultLayout: 'main'
});

var url = process.env.DATABASEURL || "mongodb://localhost/dogAdoption";
mongoose.connect(url);

app.use(express.static(__dirname + '/public'));
app.set('views',path.join(__dirname + '/views'));
app.set('view engine','handlebars');
app.engine('handlebars', handlebarsInstance.engine);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	name: 'AuthCookie',
	secret: 'some secret string!',
	resave: false,
	saveUninitialized: true
  }))
  
  app.use((req, res, next) =>{
	var text;
	if(req.session.user !== "" || req.session.user !== undefined || req.session.user.length == 0)
	{
	  text = "(Non-Authenticated User)"
	}
	else text = "(Authenticated User)"
	console.log(new Date().toUTCString(), req.method, req.originalUrl, text);
	next();
  })

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});                                                                                                
