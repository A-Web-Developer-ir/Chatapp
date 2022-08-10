const { Router } = require('express');
const userSchema = require('../schemas/userSchema');
const app = Router();

    app.get("/signup", (req, res) => {
        if (req.query.RESULT === "yes") {
            res.render("page/signup", { noteSignUp: "Registration successful. Now you can login with this link."})
        } if (req.query.RESULT === "no") {
            res.render("page/signup", { noteSignUp: "Registration failed. Someone already exists with this username."})
        } else {
            res.render("page/signup", { noteSignUp: ""})
        }
    })

    app.post("/infoSignUp", async(req, res) => {
        const user = req.body.userNameSignUp,
            passWord = req.body.passWordSignUp;

            const result = await userSchema.find({});

                let users = [];
                const data = result;
                for (x of data) {
                    users.push(x.user)
                }
                const checkUser = users.includes(user);
                if (checkUser) {
                    res.redirect("/signup?RESULT=no")
                } else {
                    const userrr = new userSchema({ user: `${user}`, passWord: `${passWord}` })
                    await userrr.save()

                    res.redirect("/signup?RESULT=yes")
                }
    })
    module.exports = app;