const { Router } = require("express");
const mongoose = require("mongoose");
const app = Router();

module.exports = (url) => {
  app.get("/chatroom", (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect("/singin");
    } else {
      mongoose.connect(url)
      const result = mongoose.model("chatList")
      res.render("page/chatroom_public", { data: result });
    }
  });
  return app;
};