const mongoose = require("mongoose");
const users = require("../schema/users")

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hikehustle.vxk6cxv.mongodb.net`;


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