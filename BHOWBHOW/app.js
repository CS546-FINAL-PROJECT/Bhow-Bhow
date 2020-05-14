const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
const app = express();
const middleware = require("./middlewares/check");
const flash = require("connect-flash");

//Use static file directory
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
//Use Session middleware
app.use(
  session({
    name: "cs546",
    secret: "12345",
    cookie: { maxAge: 600000 },
    resave: true,
    saveUninitialized: false
  })
);
app.use(flash());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
//Use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// app.use(middleware.Logging);

//set handlebar
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Set routes
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000/");
});
