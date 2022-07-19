const { Router } = require('express');
const app = Router();

app.get("/", (req,res) =>{
    res.render("mainPublic/index")
})

module.exports = app;