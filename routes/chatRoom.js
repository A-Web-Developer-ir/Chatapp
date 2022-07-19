const { Router } = require("express");
const app = Router();

module.exports = (MongoClient, url) => {
    app.get('/chatroom', (req, res) => {
        if (!req.session.loggedIn) {
            res.redirect("/singin")
        } else {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("chatApp");
                dbo.collection("chatList").find({}).toArray(function (err, result) {
                    if (err) throw err;
                    res.render("chatRoomPublic/index", { data: result});
                    db.close();
                })
            })

        }
    })
    return app;
};