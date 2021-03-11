const check = require('check-types')

module.exports = {
    validateCreate: (req, res, next) => {
        const valid = check.all(
            check.map(req.body, { title: check.nonEmptyString, content: check.nonEmptyString })
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
            check.map(req.body, {
                id: check.nonEmptyString,
                title: check.string,
                content: check.string
            })
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
        const valid = check.all(
            check.map(req.query, {
                id: check.nonEmptyString
            })
        )
        if (valid) {
            return next()
        } else {
            return res.status(400).json({
                message: 'invalid body'
            })
        }
    }
}
