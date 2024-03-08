const mongoose = require("mongoose");
const users = require("../schema/users")

const uri = process.env.DATABASE_URL;


module.exports = async (req,res,next) => {
    const body = req.body

    await mongoose.connect(uri)

    users.findOne({email: body.email})
    .then((result) => {
        console.log(result)
        res.status(200).json({todo: result.todo, level: result.level})

    })
    .catch((err) => {
        console.error(err)
    })  


}