const { Router } = require("express");
const mongoose = require("mongoose");
const messageSchema = require("../schemas/messageSchema");
const app = Router();

module.exports = (url) => {
  app.get("/chatroom", async(req, res) => {
    if (!req.session.loggedIn) {
      res.redirect("/singin");
    } else {
      mongoose.connect(url)
      const result = await messageSchema.find({});
      res.render("page/chatroom_public", { data: result });
    }
  });
  return app;
};