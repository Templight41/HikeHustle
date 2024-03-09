const express = require("express");
const app = express();
const cors = require("cors")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose');
require('dotenv').config()

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hikehustle.vxk6cxv.mongodb.net`;

//obtaining schemas
const Users = require("./schema/users")

//routes
const signup = require("./routes/signup")
const login = require("./routes/login")
const refresh = require("./routes/refresh");
const addTasks = require("./routes/addTasks");
const deleteTasks = require("./routes/deleteTasks");
const updateTasks = require("./routes/updateTasks");
const middleware = require("./routes/middleware")
const allTasks = require("./routes/allTasks");
const user = require("./routes/user");

app.post("/user", middleware, user)

app.post("/tasks/all", middleware, allTasks)

app.post("/tasks/add", middleware, addTasks)

app.post("/tasks/delete", middleware, deleteTasks)

app.post("/tasks/update", middleware, updateTasks)

app.post("/signup",  signup);

app.post("/login", login);

app.post("/refresh", refresh);


app.listen(8080, () => {
    console.log("listening on port 8080")
})