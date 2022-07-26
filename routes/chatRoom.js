const { Router } = require("express");
const messageSchema = require("../schemas/messageSchema");
const app = Router();

  app.get("/chatroom", async(req, res) => {
    if (!req.session.loggedIn) {
      res.redirect("/singin");
    } else {
      const result = await messageSchema.find({});
      res.render("page/chatroom_public", { data: result });
    }
  });
  module.exports = app;