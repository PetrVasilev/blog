const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    return res.json({
        message: 'Hello World!'
    })
})

const userApi = require('./user')
const blogApi = require('./blog')
const commentApi = require('./comment')

router.use('/user', userApi)
router.use('/blog', blogApi)
router.use('/comment', commentApi)

module.exports = router
