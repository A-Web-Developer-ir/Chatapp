const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: String,
    passWord: String
})

module.exports = mongoose.model("userInfo", userSchema, "userInfo")