const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { validateLogin, authUser } = require('../middlewares/user')
const User = require('../models/User')

const router = express.Router()

router.get('/', authUser, async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: 'not-found' })
    return res.json({
        message: 'success',
        user: {
            id: user._id,
            login: user.login
        }
    })
})

router.post(`/login`, validateLogin, async (req, res) => {
    const { login, password } = req.body
    const user = await User.findOne({ login })
    if (!user) return res.status(404).json({ message: 'not-found' })
    const correctPassword = bcrypt.compareSync(password, user.password)
    if (!correctPassword) return res.status(400).json({ message: 'invalid-password' })
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET)
    return res.json({
        message: 'success',
        token,
        user: {
            id: user._id,
            login: user.login
        }
    })
})

module.exports = router
