const DBFunc = require("../data/index");
const connection = require("../data/config/mongoConnection");
const Dog = DBFunc.dogs;
// const User = DBFunc.users;
const Adevrtiser = DBFunc.advertisers;
const Comment = DBFunc.comments;
// const Dog = require("../data/dogs");
const Admin = require("../data/admin");
const User = require("../data/users");
// const Adevrtiser = require("../data/advertisers");

var dogData = [
  {
    breed: "combai",
    name: "Yankee",
    age: "12 monthes",
    address: "183 Hutton St",
    description: "A very cute and faithful dog",
    vaccine: "Distemper,Parvovirus,Parainfluenza",
    picture:
      "https://www.dogbreedinfo.com/images31/CombaiBoarhoundDogRareBreedIndiaTiger2YearsOldSideView.jpg",
    postdate: new Date(2019, 0, 23),
    color: "Yellow",
    size: "12 ft",
    gender: "Male"
  },
  {
    breed: "combai",
    name: "Kiki",
    age: "4monthes",
    address: "52 11th St,Hoboken",
    description: "An affectionate, loyal, and playful but dignified dog",
    vaccine: "Parvovirus，Parainfluenza",
    picture:
      "https://vetstreet.brightspotcdn.com/dims4/default/e1bbd79/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F82%2F071660a40111e087a80050568d634f%2Ffile%2FAlaskan-Malamute-3-605mk062311.jpg",
    postdate: new Date(2019, 1, 23),
    color: "White and Pink",
    size: "12 ft",
    gender: "Male"
  },
  {
    breed: "American Staffordshire Terrier",
    name: "Stanford",
    age: "16monthes",
    address: "NY",
    description:
      "Very smart, confident, good-natured companions. Their courage is proverbial",
    vaccine: "Distemper,Parvovirus",
    picture:
      "https://vetstreet.brightspotcdn.com/dims4/default/94fc9d8/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fc5%2Fe57d80a71811e0a0d50050568d634f%2Ffile%2FAmerican-Staffordshire-Terrier-3-645mk070411.jpg",
    postdate: new Date(2019, 0, 23),
    color: "Yellow",
    size: "14 ft",
    gender: "Male"
  },
  {
    breed: "Golden Retriever",
    name: "Sparky",
    age: "2 years",
    address: "1 Castle Point terrace",
    description: "Loyal and playful companion",
    vaccine: "Parvovirus",
    picture:
      "https://vetstreet.brightspotcdn.com/dims4/default/94fc9d8/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fc5%2Fe57d80a71811e0a0d50050568d634f%2Ffile%2FAmerican-Staffordshire-Terrier-3-645mk070411.jpg",
    postdate: new Date(2019, 0, 23),
    color: "Golden",
    size: "12 ft",
    gender: "Female"
  }
];
var userData = [
  {
    username: "Dogluvr1979",
    password: "Qword111",
    email: "Dolores19@gmail.com",
    gender: "Female",
    address: "1277 Hogwarts Place",
    city: "Hoboken",
    state: "NJ",
    age: 25
  },
  {
    username: "Catssuck301",
    password: "Qassword123",
    email: "Metsfan192@gmail.com",
    gender: "Male",
    address: "19 Trinity Way",
    city: "Hoboken",
    state: "NJ",
    age: 52
  },
  {
    username: "Skaterboy1999",
    password: "PopPunk11e",
    email: "MikeyWay@gmail.com",
    gender: "Male",
    city: "Hoboken",
    state: "NJ",
    address: "14 Parade Street",
    age: 35
  }
];
var advertiserData = [
  {
    firstName: "Vin",
    lastName: "Salazar",
    email: "DocJohn@gmail.com",
    password: "Vet1999",
    cellphone: "732-288-2819",
    address: " 1 Wizardly Way"
  },
  {
    firstName: "Sarah",
    lastName: "Connor",
    email: "terminator@gmail.com",
    password: "Vet1999",
    cellphone: "732-199-7927",
    address: " 1991 Myrtle Lane"
  },
  {
    firstName: "George",
    lastName: "Martin",
    email: "Tolkeinluvr@gmail.com",
    password: "Vet1999",
    cellphone: "201-999-1629",
    address: " 12 Felicity Street"
  }
];
async function main() {
  const db = await connection();

  try {
    var admin = await Admin.registar("124@adf.com", "Adfafw12");
    for (var i = 0; i < advertiserData.length; i++) {
      var newAdvertiser = advertiserData[i];
      var advertiser = await Adevrtiser.registar(
        newAdvertiser.firstName,
        newAdvertiser.lastName,
        newAdvertiser.email,
        newAdvertiser.cellphone,
        newAdvertiser.address,
        newAdvertiser.password
      );

      var newDog = dogData[i];

      await Dog.createDog(
        advertiser._id,
        newDog.breed,
        newDog.name,
        newDog.age,
        newDog.address,
        newDog.description,
        newDog.vaccine,
        newDog.picture,
        newDog.postdate,
        newDog.color,
        newDog.size,
        newDog.gender
      );
    }
  } catch (e) {
    console.log(e);
  }
  try {
    for (var i = 0; i < userData.length; i++) {
      var newUser = userData[i];
      await User.registar(
        newUser.username,
        newUser.password,
        newUser.email,
        newUser.gender,
        newUser.city,
        newUser.state,
        newUser.age
      );
    }
  } catch (e) {
    console.log(e);
  }

  console.log(`SEEDING DONE.`);
  await db.serverConfig.close();
}

main();
module.exports = main;
