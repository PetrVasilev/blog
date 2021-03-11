const check = require('check-types')
const jwt = require('jsonwebtoken')

module.exports = {
    validateLogin: (req, res, next) => {
        const valid = check.all(
            check.map(req.body, { login: check.nonEmptyString, password: check.nonEmptyString })
        )
        if (valid) {
            return next()
        } else {
            return res.status(400).json({
                message: 'invalid body'
            })
        }
    },
    authUser: (req, res, next) => {
        const { authorization } = req.headers
        try {
            const verified = jwt.verify(authorization, process.env.TOKEN_SECRET)
            req.user = verified
            return next()
        } catch (err) {
            console.error(err)
            return res.status(401).json({
                message: 'not-authorized'
            })
        }
    }
}
