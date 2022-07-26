const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: String,
    passWord: String
})

module.exports = mongoose.model("userInfo", messageSchema)