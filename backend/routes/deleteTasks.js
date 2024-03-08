const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Users = require("../schema/users");

const uri = process.env.DATABASE_URL;


module.exports = async (req, res, next) => {
    const body = req.body;
    
    await mongoose.connect(uri);

    await Users.findOneAndUpdate({ email: body.email }, { $pull : { todo: { taskId : body.taskId } } })
    .then((result) => {
        console.log(result)
        res.status(200).json({msg: "deleted"})
    })
    .catch((err) => {
        res.status(500).json({msg: err})
        console.log(err)
    })
    
    
}