const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const accessToken = req.body.accessToken

    try {
        const result = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY)
        req.body.email = result.email

        next()
    } catch (err) {
        res.status(401).json({msg: "sessions expired"})
        console.error(err)
    }
}