const { Router } = require("express");
const app = Router();

app.get("/", (req, res) => {
  res.render("page/main_public");
});

module.exports = app;
