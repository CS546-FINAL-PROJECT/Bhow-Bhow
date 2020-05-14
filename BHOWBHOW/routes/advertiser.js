const express = require("express");
const router = express.Router();
const xss = require("xss");

const data = require("../data");

const advertisers = data.advertisers;

// const checkLogin = require("../middlewares/check").checkLogin;
const checkAdvertiserLoggin = require("../middlewares/check").checkAdvertiserLogin;
// const logging = require("../middlewares/check").Logging;

router.get("/", async (req, res) => {
  // res.send('Questions create Page');
  // res.json()
  // res.json({ desp: "main page of the advertiser" });
  res.render("Advertiser/advertiser_center");
});


router
  .get("/register", async (req, res) => {
    // res.send('Questions create Page');
    // res.json()
    res.render("Advertiser/advertiser_register");
    // res.json({ desp: "register page of the advertiser." });
  })
  .post("/register", async (req, res) => {
    // res.send('Questions create Page');
    // res.json()
    const advInfo = req.body;
    let firstName = xss(advInfo.firstName);
    let lastName = xss(advInfo.lastName);
    let email = xss(advInfo.email);
    let cellphone = xss(advInfo.cellphone);
    let address = xss(advInfo.address);
    let password = xss(advInfo.password);
    if (!firstName) {
      res.render("Advertiser/advertiser_register",{error:"Please provide the firstName."});
      return;
    }

    if (!lastName) {
      res.render("Advertiser/advertiser_register",{error:"Please provide the lastName."});
      return;
    }
    if (!email) {
      res.render("Advertiser/advertiser_register",{error:"Please provide the email."});
      return ;
    }
    if (/^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/.test(cellphone) && cellphone) {
      cellphone = parseInt(cellphone);
    } else  {
      res.render("Advertiser/advertiser_register",{error:"Invalid cellphone. "});
      return;
    }
    if (!address) {
      res.render("Advertiser/advertiser_register",{error:"Please provide the address."});
      return;
    }
    if (!password) {
      res.render("Advertiser/advertiser_register",{error:"Please provide the password."});
      return;
    }

    try {

      var advertiserData = await advertisers.registar(
        firstName,
        lastName,
        email,
        cellphone,
        address,
        password
      );
      req.session.identity = {
        id: advertiserData._id,
        identity: "uesr"
      };
      // res.json(advertiserData);
      res.redirect("/BhowBhow");
      // res.send({ success: true });

    } catch (e) {
      res.render("Advertiser/advertiser_register"),{error:e};
      // res.status(500).json({ error: e });
    }
  });

router
  .get("/login", async (req, res) => {
    res.render("Advertiser/advertiser_login");
  })
  .post("/login", async (req, res) => {

    const advInfo = req.body;

    let email = xss(advInfo.email);
    let password = xss(advInfo.password);

    if (!email) {
      res.render("Advertiser/advertiser_login",{error:"Please provide the email."});
      return;
    }

    if (!password) {
      res.render("Advertiser/advertiser_login",{error:"Please provide the password."});
      return;
    }

    try {
      advertiserData = await advertisers.login(email, password);
      req.session.identity = {
        id: advertiserData._id,
        identity: "advertiser"
      };
      
      res.redirect("/BhowBhow/");       //redirect to home page

    } catch (e) {
      res.render("Advertiser/advertiser_login",{error:e});

    }
  });

router
  .get("/center", checkAdvertiserLoggin,async (req, res) => {
    // console.log(req.session);
    res.render("Advertiser/advertiser_center");

  })
  .put("/center", checkAdvertiserLoggin,async (req, res) => {

    const advInfo = req.body;
    let firstName = xss(advInfo.firstName);
    let lastName = xss(advInfo.lastName);
    let cellphone = xss(advInfo.cellphone);
    let address = xss(advInfo.address);
    let password = xss(advInfo.password);
    if (!firstName) {
      res
        .status(400)
        .json({ error: "Please provide the firstName." })
        .end();
      return;
    }

    if (!lastName) {
      res
        .status(400)
        .json({ error: "Please provide the lastName." })
        .end();
      return;
    }
    if (!cellphone) {
      res
        .status(400)
        .json({ error: "Please provide the cellphone." })
        .end();
      return;
    }
    if (!address) {
      res
        .status(400)
        .json({ error: "Please provide the address." })
        .end();
      return;
    }
    if (!password) {
      res
        .status(400)
        .json({ error: "Please provide the password." })
        .end();
      return;
    }

    try {
      // console.log(firstName,lastName);
      advertiserData = await advertisers.infoUpdate(
        req.session.identity.id,
        firstName,
        lastName,
        cellphone,
        address,
        password
      );
      // console.log(advertiserData);
      res.redirect("/BhowBhow");
      // res.json(advertiserData);
      // res.send({ success: true });
    } catch (e) {
      res.render("Advertiser/advertiser_center",{error:e});
      // res.status(500).json({ error: e });
    }
  });

module.exports = router;
