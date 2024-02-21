const express = require("express");
const app = express();
const cors = require("cors")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose');
require('dotenv').config()

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hikehustle.vxk6cxv.mongodb.net`;

//obtaining schemas
const Users = require("./schema/users")

//routes
const signup = require("./routes/signup")
const login = require("./routes/login")

app.post("/signup", signup)

app.post("/login", login)


app.listen(3000, () => {
    console.log("listening on port 3000")
})