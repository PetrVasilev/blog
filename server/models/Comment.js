const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new Schema({
    text: { type: String, required: true },
    user: { type: ObjectId, ref: 'User' },
    blog: { type: ObjectId, ref: 'Blog' },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Comment', schema)
