const mongoose = require("mongoose");
const Tasks = require("./tasks")

const Users = new mongoose.Schema({
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    refreshToken: { type: String },
    image: { type: String, default: "default.png"},
    level: { type: Number, default: 1 },
    todo: [Tasks]
})

module.exports = mongoose.model("Users", Users)