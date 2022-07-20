const express = require("express");
const app = express();
const session = require("express-session");
// database
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

// imports
const chatRoomWebSocket = require("./socket/chatRoom");
const { chatRoomRouter, mainPage, signInPage, signUpPage } = require("./routes");
const { relativePath } = require("./utils/relative_path");

app.use(express.urlencoded({ extended: true }));

const sessionMiddleware = session({
  secret: "Keep it secret",
  name: "uniqueSessionID",
  saveUninitialized: false,
});
app.use(sessionMiddleware);

app.use("/public", express.static("public"));

app.set("view engine", "ejs");
app.set("views", relativePath("views"));

// routes
app.use(chatRoomRouter(MongoClient, url));
app.use(mainPage);
app.use(signInPage(MongoClient, url));
app.use(signUpPage(MongoClient, url));

//socket
const http = chatRoomWebSocket(app, MongoClient, url, sessionMiddleware);

http.listen(3000, () => {
  console.log("server is running");
});
