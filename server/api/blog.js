const express = require('express')

const Blog = require('../models/Blog')
const User = require('../models/User')
const { validateCreate, validateEdit, validateDelete } = require('../middlewares/blog')
const { authUser } = require('../middlewares/user')

const router = express.Router()

router.get(`/list`, async (req, res) => {
    const { skip, limit, userId } = req.query
    let filter = {}
    if (userId) {
        filter['user'] = userId
    }
    const blogs = await Blog.find(filter)
        .populate('user')
        .sort('-createdAt')
        .limit(limit)
        .skip(skip)
    return res.json({
        message: 'success',
        blogs: blogs.map((item) => ({
            id: item.id,
            title: item.title,
            content: item.content,
            createdAt: item.createdAt,
            user: {
                id: item.user.id,
                login: item.user.login
            }
        }))
    })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findById(id).populate('user')
    if (!blog) {
        return res.status(404).json({
            message: 'not-found'
        })
    }
    return res.json({
        message: 'success',
        blog: {
            id: blog.id,
            title: blog.title,
            content: blog.content,
            createdAt: blog.createdAt,
            user: {
                id: blog.user.id,
                login: blog.user.login
            }
        }
    })
})

router.post(`/`, validateCreate, authUser, async (req, res) => {
    const { title, content } = req.body
    const blog = new Blog({
        title,
        content,
        user: req.user.id
    })
    const savedBlog = await blog.save()
    const user = await User.findById(req.user.id)
    return res.json({
        message: 'success',
        blog: {
            id: savedBlog.id,
            title: savedBlog.title,
            content: savedBlog.content,
            createdAt: savedBlog.createdAt,
            user: {
                id: user.id,
                login: user.login
            }
        }
    })
})

router.put(`/`, validateEdit, authUser, async (req, res) => {
    const { id, title, content } = req.body
    const blog = await Blog.findOne({ _id: id, user: req.user.id }).populate('user')
    if (!blog) {
        return res.status(404).json({
            message: 'not-found'
        })
    }
    if (title) {
        blog.title = title
    }
    if (content) {
        blog.content = content
    }
    const updatedBlog = await blog.save()
    return res.json({
        message: 'success',
        blog: {
            id: updatedBlog.id,
            title: updatedBlog.title,
            content: updatedBlog.content,
            createdAt: updatedBlog.createdAt,
            user: {
                id: blog.user.id,
                login: blog.user.login
            }
        }
    })
})

router.delete(`/`, validateDelete, authUser, async (req, res) => {
    const { id } = req.query
    const blog = await Blog.findOne({ _id: id, user: req.user.id })
    if (!blog) {
        return res.status(404).json({
            message: 'not-found'
        })
    }
    await blog.remove()
    return res.json({
        message: 'success',
        blog: { id: blog.id }
    })
})

module.exports = router
