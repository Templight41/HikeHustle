const mongoose = require("mongoose");

const Users = new mongoose.Schema({
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    refreshToken: { type: String },
    image: { type: String, default: "default.png"},
    level: { type: Number, default: 1 },
})

module.exports = mongoose.model("Users", Users)