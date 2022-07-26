const { Router } = require('express');
const userSchema = require('../schemas/userSchema');
const app = Router();

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

            const result = await userSchema.find({});

                let users = [];
                const data = result;
                for (x of data) {
                    users.push(x.user)
                }
                const checkUser = users.includes(user);
                if (checkUser) {
                    res.redirect("/singup?RESULT=no")
                } else {
                    const userrr = new userSchema({ user: `${user}`, passWord: `${passWord}` })
                    await userrr.save()

                    res.redirect("/singup?RESULT=yes")
                }
    })
    module.exports = app;