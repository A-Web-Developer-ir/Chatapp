const { Router } = require('express');
const mongoose = require('mongoose');
const signupSchema = require('../schemas/signupSchema');
const app = Router();


module.exports = (url) => {

    app.get("/singup", (req, res) => {
        if (req.query.RESULT === "yes") {
            res.render("page/signup", { noteSingUp: "Registration successful. Now you can login with this link."})
        } if (req.query.RESULT === "no") {
            res.render("page/signup", { noteSingUp: "Registration failed. Someone already exists with this username."})
        } else {
            res.render("page/signup", { noteSingUp: ""})
        }
    })

    app.post("/infoSingUp", async(req, res) => {
        const user = req.body.userNameSingUp,
            passWord = req.body.passWordSingUp;

            mongoose.connect(url)
            const result = await userInfo.find({});

                let users = [];
                const data = result;
                for (x of data) {
                    users.push(x.user)
                }
                const checkUser = users.includes(user);
                if (checkUser) {
                    res.redirect("/singup?RESULT=no")
                } else {
                    mongoose.connect(url)
                    const userrr = new signupSchema({ user: `${user}`, passWord: `${passWord}` })
                    await userrr.save()

                    res.redirect("/singup?RESULT=yes")
                }
    })
    return app;
}