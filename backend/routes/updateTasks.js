const mongoose = require("mongoose")
const tasks = require("../schema/tasks");
const users = require("../schema/users");

const uri = process.env.DATABASE_URL;


module.exports = async (req, res, next) => {
    const body = req.body;
    console.log(body)
    
    await mongoose.connect(uri);

    const filter = { taskId: body.taskId }
    const update = { completed: body.completed }

    await tasks.findOneAndUpdate(filter, update)
    .then((result) => {
        console.log(result)
        users.findOneAndUpdate({email: body.email}, {$inc : {level: 1}})
        .then((result) => {
            console.log(result)
        })
        .catch(err=> console.error(err))

        
        res.status(200).json({msg: "updated", allTasks: result})
    })
    .catch((err) => {
        console.error(err)
        res.status(500).json({msg: err})
    })
}