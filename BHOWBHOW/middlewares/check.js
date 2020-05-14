module.exports = {
  //check login
  // checkLogin: function checkLogin(req, res, next) {
  //   if (!req.session.identity) {
  //     res.redirect("/BhowBhow");
  //     return;
  //   }
  //   next();
  // },

  checkAdvertiserLogin: function checkAdvertiserLogin(req, res, next) {
    if (!req.session.identity) {
      res.redirect("/BhowBhow");
      return;
    } else if (req.session.identity.identity === "admin") {
      res.redirect("/BhowBhowAdmin");
      return;
    } else if (req.session.identity.identity === "user") {
      res.redirect("/BhowBhowUser");
      return;
    }
    next();
  },

  checkUserLogin: function checkUserLogin(req, res, next) {
    if (!req.session.identity) {
      res.redirect("/BhowBhow");
      return;
    } else if (req.session.identity.identity === "admin") {
      res.redirect("/BhowBhowAdmin");
      return;
    } else if (req.session.identity.identity === "adveritser") {
      res.redirect("/BhowBhowAdveritser");
      return;
    }
    next();
  },
  checkAdminLogin: function checkAdminLogin(req, res, next) {
    if (!req.session.identity) {
      res.redirect("/BhowBhow");
      return;
    } else if (req.session.identity.identity === "user") {
      res.redirect("/BhowBhowUser");
      return;
    } else if (req.session.identity.identity === "adveritser") {
      res.redirect("/BhowBhowAdveritser");
      return;
    }
    next();
  },

  // checkNotLogin: function checkNotLogin(req, res, next) {
  //   if (req.session.user) {
  //     if (req.session.user.identity === "candidate") {
  //       res.redirect("/QuizMeCandidate");
  //       return;
  //     } else if (req.session.user.identity === "creator") {
  //       res.redirect("/QuizMeCreator");
  //       return;
  //     }
  //   }
  //   next();
  // },

  Logging: function Logging(req, res, next) {
    console.log(
      `[${new Date().toUTCString()}]:${req.method} ${req.originalUrl}`
    );
    // console.log(req.session);

    next();
  }
};
