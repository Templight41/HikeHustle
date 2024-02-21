const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const Users = require("../schema/users")
const jwt = require('jsonwebtoken')

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hikehustle.vxk6cxv.mongodb.net`;

module.exports = async (req, res, next) => {
    const user = req.body
    try {
        await mongoose.connect(uri);

        //generating hashed password
        const hashedPassword = await bcrypt.hash(user.password, 10)
        
        // signing token and refresh token
        const Token = jwt.sign({username: user.username, email: user.email}, process.env.JWT_LOGIN_KEY, { expiresIn: '24h' })
        const refreshToken = jwt.sign({username: user.username, email: user.email}, process.env.JWT_REFRESH_KEY)
        
        // inserting into database
        await Users.insertMany({username: user.username, refreshToken: refreshToken, email: user.email, password: hashedPassword})
        .then((result) => {
            res.status(200).json({Token: Token, refreshToken: refreshToken, username: user.username, email: user.email})
        })
        .catch((err) => {
            res.status(409).json({error: "User exists"})
        })

        //send email to client
        //code here

    } catch (error) {
        console.log(error)
    }
}