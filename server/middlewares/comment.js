const check = require('check-types')

module.exports = {
    validateCreate: (req, res, next) => {
        const valid = check.all(
            check.map(req.body, { text: check.nonEmptyString, blogId: check.nonEmptyString })
        )
        if (valid) {
            return next()
        } else {
            return res.status(400).json({
                message: 'invalid body'
            })
        }
    },
    validateEdit: (req, res, next) => {
        const valid = check.all(
            check.map(req.body, { text: check.nonEmptyString, id: check.nonEmptyString })
        )
        if (valid) {
            return next()
        } else {
            return res.status(400).json({
                message: 'invalid body'
            })
        }
    },
    validateDelete: (req, res, next) => {
        const valid = check.all(check.map(req.query, { id: check.nonEmptyString }))
        if (valid) {
            return next()
        } else {
            return res.status(400).json({
                message: 'invalid body'
            })
        }
    }
}
