const { Router } = require('express');
const app = Router();


module.exports = (MongoClient, url) => {

    app.get("/singup", (req, res) => {
        if (req.query.RESULT === "yes") {
            res.render("pages/signup", { noteSingUp: "Registration successful. Now you can login with this link."})
        } if (req.query.RESULT === "no") {
            res.render("pages/signup", { noteSingUp: "Registration failed. Someone already exists with this username."})
        } else {
            res.render("pages/signup", { noteSingUp: ""})
        }
    })

    app.post("/infoSingUp", (req, res) => {
        const user = req.body.userNameSingUp,
            passWord = req.body.passWordSingUp;

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("chatApp");
            dbo.collection("usersInfo").find({}).toArray(function (err, result) {
                if (err) throw err;


                let users = [];
                const data = result;
                for (x of data) {
                    users.push(x.user)
                }

                const checkUser = users.includes(user);
                if (checkUser) {
                    res.redirect("/singup?RESULT=no")
                } else {

                    MongoClient.connect(url, (err, db) => {
                        if (err) throw err;
                        const dbo = db.db("chatApp");

                        const myobj = { user: `${user}`, passWord: `${passWord}` }

                        dbo.collection("usersInfo").insertOne(myobj, (err) => {
                            if (err) throw err;
                            console.log("1 user added");
                            db.close();
                        });
                    });

                    res.redirect("/singup?RESULT=yes")
                }
            });
        });
    })
    return app;
}