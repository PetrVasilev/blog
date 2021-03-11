const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose

const schema = new Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const initialUsers = [
    {
        login: 'john',
        password: 'john1234'
    },
    {
        login: 'kate',
        password: 'kate1234'
    },
    {
        login: 'bob',
        password: 'bob1234'
    }
]

schema.statics.initDB = async function () {
    const User = this
    try {
        for (let user of initialUsers) {
            const exist = await User.findOne({ login: user.login })
            if (!exist) {
                const hash = bcrypt.hashSync(user.password)
                const newUser = new User({
                    login: user.login,
                    password: hash
                })
                await newUser.save()
                console.log(`User ${user.login} created`)
            }
        }
    } catch (err) {
        console.error(err)
    }
}

module.exports = mongoose.model('User', schema)
