const express = require('express')

const Comment = require('../models/Comment')
const User = require('../models/User')
const { validateCreate, validateEdit, validateDelete } = require('../middlewares/comment')
const { authUser } = require('../middlewares/user')

const router = express.Router()

router.get('/:blogId', async (req, res) => {
    const { blogId } = req.params
    const comments = await Comment.find({ blog: blogId }).populate('user')
    return res.json({
        message: 'success',
        comments: comments.map((item) => ({
            id: item.id,
            text: item.text,
            createdAt: item.createdAt,
            user: {
                id: item.user.id,
                login: item.user.login
            }
        }))
    })
})

router.post('/', validateCreate, authUser, async (req, res) => {
    const { text, blogId } = req.body
    const comment = new Comment({
        text,
        blog: blogId,
        user: req.user.id
    })
    const savedComment = await comment.save()
    const user = await User.findById(req.user.id)
    return res.json({
        message: 'success',
        comment: {
            id: savedComment.id,
            text: savedComment.text,
            createdAt: savedComment.createdAt,
            user: {
                id: user.id,
                login: user.login
            }
        }
    })
})

router.put('/', validateEdit, authUser, async (req, res) => {
    const { id, text } = req.body
    const comment = await Comment.findOne({ _id: id, user: req.user.id })
    if (!comment) {
        return res.status(404).json({ message: 'not-found' })
    }
    comment.text = text
    const updatedComment = await comment.save()
    const user = await User.findById(req.user.id)
    return res.json({
        message: 'success',
        comment: {
            id: updatedComment.id,
            text: updatedComment.text,
            createdAt: updatedComment.createdAt,
            user: {
                id: user.id,
                login: user.login
            }
        }
    })
})

router.delete(`/`, validateDelete, authUser, async (req, res) => {
    const { id } = req.query
    const comment = await Comment.findOne({ _id: id, user: req.user.id })
    if (!comment) {
        return res.status(404).json({ message: 'not-found' })
    }
    await comment.remove()
    return res.json({
        message: 'success',
        comment: {
            id: comment.id
        }
    })
})

module.exports = router
