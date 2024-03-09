const mongoose = require("mongoose")
const users = require("../schema/users")

const uri = process.env.DATABASE_URL;

module.exports = async (req, res, next) => {
    const body = req.body;
    
    await mongoose.connect(uri);

    await users.findOne({email: body.email})
    .then(result => {
        res.status(200).json({user: result})
    })

}