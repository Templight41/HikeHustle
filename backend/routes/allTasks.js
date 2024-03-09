const mongoose = require("mongoose");
const tasks = require("../schema/tasks")

const uri = process.env.DATABASE_URL;


module.exports = async (req,res,next) => {
    const body = req.body

    await mongoose.connect(uri)

    tasks.find({email: body.email})
    .then((result) => {
        console.log(result)
        res.status(200).json({todo: result})

    })
    .catch((err) => {
        console.error(err)
    })  


}