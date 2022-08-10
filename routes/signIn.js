const { Router } = require("express");
const userSchema = require('../schemas/userSchema');
const app = Router();

  app.get("/signin", (req, res) => {
    if (req.query.RESULT === "no") {
      res.render("page/signin", {
        noteSignIn:
          "Login failed.  If you have not registered before, you can register with this link:",
      });
    } else {
      res.render("page/signin", { noteSignIn: "" });
    }
  });

  app.post("/infoSignIn", async(req, res) => {
    const user = req.body.userNameSignIn,
      passWord = req.body.passWordSignIn;

    const result = await userSchema.find({});

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
      res.redirect("/signin?RESULT=no");
    }
  });
  
  module.exports = app;
