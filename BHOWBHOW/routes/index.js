const HomeRoutes = require("./homepage");
const UserRoutes = require("./user");
const AdvertiserRoutes = require("./advertiser");
const DogRoutes = require("./dog");
const AdminRoutes = require("./admin");
const logoutRoutes = require("./logout");

const constructorMethod = app => {
  app.use("/", HomeRoutes);
  app.use("/BhowBhowUser", UserRoutes);
  app.use("/BhowBhowAdvertiser", AdvertiserRoutes);

  app.use("/BhowBhowAdmin", AdminRoutes);

  app.use("/logout", logoutRoutes);

  app.use("/dog",DogRoutes);


  app.use("*", (req, res) => {
    // res.json({ error: "Something wrong!" });
    res.render("404");
  });
};

module.exports = constructorMethod;
