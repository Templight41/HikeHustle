const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    const refreshToken = req.body.refreshToken
    const accessToken = req.body.accessToken
    console.log("refresh")

    
    const result = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY)
    const accessDecoded = jwt.decode(accessToken)

    if(!result) {
        res.status(401).json({msg: "not authorized"})
    }

    console.log("refresh")

    console.log(accessDecoded)
    if(accessDecoded != null && (result.email == accessDecoded.email)) {
        const newToken = jwt.sign({username: result.username, email: result.email}, process.env.JWT_ACCESS_KEY, {expiresIn: '2h'})
    
        res.status(200).json({token: newToken, refreshToken: refreshToken})

    } else {
        res.status(401).json({msg: "not authorized"})
    }

}