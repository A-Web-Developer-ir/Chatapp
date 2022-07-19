const express = require('express');
const app = express();
const session = require('express-session');
// database
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

// imports
const chatRoomRouter = require("./routes/chatRoom");
const chatRoomWebSocket = require('./socket/chatRoom');
const mainPage = require('./routes/main');
const singInPage = require('./routes/singIn');
const singUpPage = require('./routes/singUp');

app.use(express.urlencoded({ extended: true }));

const sessionMiddleware = session({
    secret: 'Keep it secret'
    , name: 'uniqueSessionID'
    , saveUninitialized: false
});
app.use(sessionMiddleware);

app.use(express.static("public"))

app.set("view engine", "ejs");
app.set("views", "public");



// routes
app.use(chatRoomRouter(MongoClient, url))
app.use(mainPage)
app.use(singInPage(MongoClient, url))
app.use(singUpPage(MongoClient, url))

//socket
const http = chatRoomWebSocket(app, MongoClient, url, sessionMiddleware)

http.listen(3000, () => {
    console.log("server is running");
})





// terminal bala biar