const mongoose = require("mongoose")
const Users = require("../schema/users");

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hikehustle.vxk6cxv.mongodb.net`;

module.exports = async (req, res, next) => {
    const body = req.body;
    
    await mongoose.connect(uri);

    await Users.findOneAndUpdate( { email: body.email } , {$push : {todo: {taskId: body.taskId, task: body.task, completed: body.completed, completeBy: body.completeBy}} })
    .then((result) => {
        console.log(result)
        res.status(200).json({msg: "added"})
    })
    .catch((err) => {
        console.error(err)
        res.status(500).json({msg: err})
    })
}