const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Blog', schema)
