const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;


const data = require("../data");
const Dog = require("../data/dogs");


router.get("/listdogs", async (req, res) => {
  // res.send('Questions create Page');
  // res.json()
  res.render({ desp: "center page of the advertiser" });
});

router.get("/astro",async (req,res) =>{
    res.render("Recommened/astro_details");
});
router.get("/zena",async (req,res) =>{
    res.render("Recommened/zena_details");
});
router.get("/sandy",async (req,res) =>{
    res.render("Recommened/sandy_details");
});
router.get("/hamilton",async (req,res) =>{
    res.render("Recommened/hamilton_details");
});


router
  .get("/adddog", async (req, res) => {

    res.render({ desp: "center page of the advertiser" });
  })
  .post("/adddog", async (req, res) => {

    //-------------------------------
    var newDog = req.body;
    var breed =  newDog.breed;
    var name = newDog.name;
    var age = newDog.age;
    var address = newDog.address;
    var description = newDog.description;
    var vaccine = newDog.vaccine;
    var picture = newDog.picture;
    var postdate = newDog.postdate;
    var color = newDog.color;
    var size = newDog.size;
    var gender = newDog.gender;
    var advertiser = req.params.id;
    try{
        Dog.createDog(advertiser,breed,name,age,address,description,vaccine,picture,postdate,color,size, gender);
    }catch(e){
        res.status(404).json({ message: "not found!" });
    }


    res.render({ desp: "center page of the advertiser" });
  });


//  --------------------------------
router.get("/quiz",function(req,res){
    res.render("Mainpage/dog-quiz");                 // dog quiz
});
router.get("/search",function(req,res){
    res.render("Search/dog-search");                   //search engine
});

router.post("/search",async function(req,res) {
    var keyword = req.body.keyword.toLowerCase();
    if(req.body.search === "breed")
    {  
      const dogs = await Dog.listByBreed(keyword);     
      res.render("Search/dog-search",{ dogs:dogs  });       //findby breed
    }
    else if(req.body.search === "location"){
        const dogs = await Dog.listByLocation(keyword);    
        res.render("Search/dog-search",{  dogs:dogs  });
    }else if(req.body.search === "age"){
        const dogs = await Dog.listByAge(keyword);    
        res.render("Search/dog-search",{  dogs:dogs  });
    }
});

router.get("/breeds",async function(req,res){
    res.render("Mainpage/dog-breeds");
});
router.get("/nutririon",async function(req,res){
  // res.render("Mainpage/");
    res.render("FeedingGuide/dog-nutririon");
});
router.get("/problems",async function(req,res){
    res.render("FeedingGuide/dog-problems")
});
router.get("/problem1",async function(req,res){
    res.render("FeedingGuide/problem1");
});
router.get("/problem2",async function(req,res){
    res.render("FeedingGuide/problem2");
});


router.get("/:id",async function (req,res){
    try {

        var foundDog =  await Dog.getById(req.params.id);
        console.log(foundDog);
        res.render("Mainpage/dog_detail",{
            breed: foundDog.breed,
            name: foundDog.name,
            age: foundDog.age,
            address: foundDog.address,
            description: foundDog.description,
            vaccine: foundDog.vaccine,
            picture: foundDog.picture,
            postdate: foundDog.postdate,
            color: foundDog.color,
            size: foundDog.size,
            gender: foundDog.gender,
            comments:foundDog.comments
        });
    }catch(e){
        res.status(404).json({ message: "not found!" });
    }
});


router.put("/",function(req,res){
    try {
        const dog = Dog.getById(req.params.id);
        Dog.infoUpdate(  req.params.id,
            req.body.breed,req.body.name,req.body.age,req.body.address,
            req.body.description,req.body.vaccine,req.body.picture,
            req.body.postdate,req.body.color,req.body.size,
            req.body.gender);
            
        res.render("dogPage",{
            breed: dog.breed,
            name: dog.name,
            age: dog.age,
            address: dog.address,
            description: dog.description,
            vaccine: dog.vaccine,
            picture: dog.picture,
            postdate: dog.postdate,
            color: dog.color,
            size: dog.size,
            gender: dog.gender
        });
    }catch(e){
        res.status(404).json({ message: "not found!" });
    }
});

module.exports = router;
