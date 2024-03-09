const mongoose = require("mongoose")
const tasks = require("../schema/tasks")

const uri = process.env.DATABASE_URL;

module.exports = async (req, res, next) => {
    const body = req.body;
    
    await mongoose.connect(uri);

    await tasks.insertMany({ email: body.email, taskId: body.taskId, task: body.task, completed: body.completed, completeBy: body.completeBy })
    .then((result) => {
        console.log(result)
        res.status(200).json({msg: "added"})
    })
    .catch((err) => {
        console.error(err)
        res.status(500).json({msg: err})
    })
}