require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const api = require('./api')
const User = require('./models/User')

const app = express()
const port = process.env.PORT || 3000

mongoose
    .connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        if (process.env.NODE_ENV !== 'testing') {
            console.log(`MongoDB connected ${process.env.MONGO_DB}`)
            User.initDB()
        }
    })
    .catch((err) => {
        throw err
    })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', api)

app.listen(port, () => {
    if (process.env.NODE_ENV !== 'testing') {
        console.log(`Server listening at :${port}`)
    }
})

module.exports = { app }
