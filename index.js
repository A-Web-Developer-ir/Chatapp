const express = require("express");
const app = express();
const session = require("express-session");
// database
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/chatApp";

// imports
const chatRoomWebSocket = require("./socket/chatRoom");
const { chatRoomRouter, mainPage, signInPage, signUpPage } = require("./routes");
const { relativePath } = require("./utils/relative_path");

app.use(express.urlencoded({ extended: true }));
mongoose.connect(url)

const sessionMiddleware = session({
  secret: "Keep it secret",
  name: "uniqueSessionID",
  saveUninitialized: false,
  maxAge: 36000
});
app.use(sessionMiddleware);

app.use("/public", express.static("public"));

app.set("view engine", "ejs");
app.set("views", relativePath("views"));

// routes
app.use(chatRoomRouter(url));
app.use(mainPage);
app.use(signInPage(url));
app.use(signUpPage(url));

//socket
const http = chatRoomWebSocket(app, url, sessionMiddleware);

http.listen(3000, () => {
  console.log("server is running");
});
