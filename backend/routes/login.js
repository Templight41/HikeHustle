const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const Users = require("../schema/users")
const jwt = require('jsonwebtoken')

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hikehustle.vxk6cxv.mongodb.net`;

module.exports = async (req, res, next) => {
    const user = req.body
    try {
        await mongoose.connect(uri);

        const userDbData = await Users.findOne({email: user.email})
        .then((result) => {
            if(!result) throw new Error("doesn't exist")
            return result
        })
        .catch((err) => {
            res.status(404).json({err: "User not found"})
        })

        if(!await bcrypt.compare(user.password, userDbData.password)) {
            res.status(401).json({msg: "Wrong password"})
            throw new Error("Wrong password")
        }

        const Token = jwt.sign({username: userDbData.username, email: user.email}, process.env.JWT_LOGIN_KEY, { expiresIn: '24h' })
        const refreshToken = jwt.sign({username: userDbData.username, email: user.email}, process.env.JWT_REFRESH_KEY)

        res.status(200).json({Token: Token, refreshToken: refreshToken, username: userDbData.username, email: userDbData.email})

    } catch (error) {
        console.log(error, "error")
    }
}