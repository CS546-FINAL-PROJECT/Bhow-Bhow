const express = require('express');
const app = express();
const cors = require('cors');
var Dog = require("./models/dog.js");
require("./models/comment")
// var Comment = require("./models/comment");
const mongoose=require("mongoose"),
   url = process.env.DATABASEURL || "mongodb://localhost/dogAdoption";
mongoose.connect(url);
// const dogs = require('./data/dogs');
// const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');
// mongoose.connect("paste db link", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
// const configRoutes = require('./routes');
app.use(cors());
// app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// configRoutes(app);
app.post("/",async function(req,res) {
  console.log(req.body);
  var keyword = req.body.keyword;
  if(req.body.search === "breed")
  {  
    Dog.find({dog_breed:keyword}).lean()
    // execute query
    .exec(function (err,dog) {
      if(err)
        console.log(err);
      else{
        res.render("search",{
          dogInfo:dog
        });
      }
    });
  }
  else if(req.body.search === "location"){
    Dog.findOne({dog_address:keyword},function (err,dog) {
      if(err)
        console.log(err);
      else{
        res.render("search",{
          dogInfo:dog
        });
      }
    });
  }else if(req.body.search === "age"){
    Dog.findOne({dog_age:keyword},function (err,dog) {
      if(err)
        console.log(err);
      else{
        res.render("search",{
          dogInfo:dog.dog
        });
      }
    });
  }
});
app.get('/', function(req, res){
  res.render("search");
});
app.get('/:id',function(req,res){
  // using .lean() to get a json object (instead of a mongoose one):
  console.log(req.params.id);
  Dog.findById(req.params.id).lean().populate("comments").exec(function(err,dog){
    if(err)
      console.log(err);
    else
      {
        console.log(dog);
        res.render("details",{dogInfo:dog});
      }
  })
})
app.listen(3000, () => {
  console.log("We've now got a server!");
});