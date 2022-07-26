const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: String,
    time: String,
    name: String,
    replayedTo: String
})

module.exports = mongoose.model("chatList", messageSchema, "chatList")