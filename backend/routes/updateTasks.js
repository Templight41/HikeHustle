const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Users = require("../schema/users");

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hikehustle.vxk6cxv.mongodb.net`;


module.exports = async (req, res, next) => {
    const body = req.body;
    console.log(body)
    
    await mongoose.connect(uri);

    await Users.findOneAndUpdate({ email: body.email }, { $set : { "todo.$[el].completed": body.completed, }, $inc : { level : 1 } }, { arrayFilters: [{"el.taskId": body.taskId}] })
    .then((result) => {
        console.log(result)
        res.status(200).json({msg: "updated", allTasks: result.todo})
    })
    .catch((err) => {
        res.status(500).json({msg: err})
    })
}