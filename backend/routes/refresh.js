const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    const refreshToken = req.body.refreshToken
    
    const result = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY)

    if(!result) {
        res.status(401).json({msg: "not authorized"})
    }

    console.log("refresh")

    const newToken = jwt.sign({username: result.username, email: result.email}, process.env.JWT_LOGIN_KEY, {expiresIn: '15s'})

    res.status(200).json({token: newToken, refreshToken: refreshToken})

}