const { Router } = require("express");
const app = Router();

module.exports = (MongoClient, url) => {
  app.get("/singin", (req, res) => {
    if (req.query.RESULT === "no") {
      res.render("pages/signin", {
        noteSingIn:
          "Login failed.  If you have not registered before, you can register with this link:",
      });
    } else {
      res.render("pages/signin", { noteSingIn: "" });
    }
  });

  app.post("/infoSingIn", (req, res) => {
    const user = req.body.userNameSingIn,
      passWord = req.body.passWordSingIn;

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("chatApp");
      dbo
        .collection("usersInfo")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;

          let users = [];
          let passWords = [];
          const data = result;
          for (x of data) {
            users.push(x.user);
            passWords.push(x.passWord);
          }

          const checkUser = users.includes(user),
            checkPassWord = passWords.includes(passWord);
          if (checkUser && checkPassWord) {
            req.session.loggedIn = true;
            req.session.username = user;
            res.redirect("/chatroom");
          } else {
            res.redirect("/singin?RESULT=no");
          }
        });
    });
  });
  return app;
};
