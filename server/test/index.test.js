const request = require('supertest')

const { app } = require('../app')

let token = null
let blogId = null
let commentId = null

describe('User', () => {
    describe('POST /api/user/login', () => {
        it('Login user', (done) => {
            request(app)
                .post('/api/user/login')
                .send({ login: 'bob', password: 'bob1234' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect((res) => {
                    if (!res.body.token) throw new Error('there is not token in body')
                })
                .expect(200)
                .then((res) => {
                    token = res.body.token
                    done()
                })
                .catch((err) => done(err))
        })
    })

    describe(`GET /api/user`, () => {
        it('Get user info', (done) => {
            request(app)
                .get('/api/user')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    if (!res.body.user) throw new Error('there is not user in body')
                    if (!res.body.user.id) throw new Error('there is not user.id in body')
                    if (!res.body.user.login) throw new Error('there is not user.login in body')
                })
                .expect(200)
                .then(() => {
                    done()
                })
                .catch((err) => done(err))
        })
    })
})

describe(`Blog`, () => {
    describe('POST /api/blog', () => {
        it('Create blog', (done) => {
            let createBlog = { title: 'test title', content: 'test content' }
            request(app)
                .post('/api/blog')
                .send(createBlog)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    if (!res.body.blog) throw new Error('there is not blog in body')
                    if (!res.body.blog.id) throw new Error('there is not blog.id in body')
                    if (!res.body.blog.title) throw new Error('there is not blog.title in body')
                    if (!res.body.blog.content) throw new Error('there is not blog.content in body')
                    if (res.body.blog.title !== createBlog.title)
                        throw new Error('title is not equal in body')
                    if (res.body.blog.content !== createBlog.content)
                        throw new Error('content is not equal in body')
                })
                .expect(200)
                .then((res) => {
                    blogId = res.body.blog.id
                    done()
                })
                .catch((err) => done(err))
        })
    })

    describe('PUT /api/blog', () => {
        it('Edit blog', (done) => {
            let editBlog = { id: blogId, title: 'test edit title', content: 'test edit content' }
            request(app)
                .put('/api/blog')
                .send(editBlog)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    if (!res.body.blog) throw new Error('there is not blog in body')
                    if (!res.body.blog.id) throw new Error('there is not blog.id in body')
                    if (!res.body.blog.title) throw new Error('there is not blog.title in body')
                    if (!res.body.blog.content) throw new Error('there is not blog.content in body')
                    if (editBlog.title !== res.body.blog.title)
                        throw new Error('title not edited in blog')
                    if (editBlog.content !== res.body.blog.content)
                        throw new Error('content not edited in blog')
                })
                .expect(200)
                .then(() => {
                    done()
                })
                .catch((err) => done(err))
        })
    })

    describe('GET /api/blog/:id', () => {
        it('Get blog by id', (done) => {
            request(app)
                .get(`/api/blog/${blogId}`)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    if (!res.body.blog) throw new Error('there is not blog in body')
                    if (!res.body.blog.id) throw new Error('there is not blog.id in body')
                    if (!res.body.blog.title) throw new Error('there is not blog.title in body')
                    if (!res.body.blog.content) throw new Error('there is not blog.content in body')
                    if (!res.body.blog.user) throw new Error('there is not blog.user in body')
                    if (blogId !== res.body.blog.id)
                        throw new Error('id from body is not equal with id in params')
                })
                .expect(200)
                .then(() => {
                    done()
                })
                .catch((err) => done(err))
        })
    })

    describe(`GET /api/blog/list`, () => {
        it('Get blog list', (done) => {
            request(app)
                .get(`/api/blog/list`)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    if (!res.body.blogs) throw new Error('there is not blogs in body')
                    if (!Array.isArray(res.body.blogs)) throw new Error('blogs is not array')
                })
                .expect(200)
                .then(() => {
                    done()
                })
                .catch((err) => done(err))
        })
    })
})

describe('Comment', () => {
    describe(`POST /api/comment`, () => {
        it('Create comment', (done) => {
            request(app)
                .post(`/api/comment`)
                .send({ text: 'test comment', blogId })
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    if (!res.body.comment) throw new Error('there is not comment in body')
                    if (!res.body.comment.id) throw new Error('there is not comment.id in body')
                    if (!res.body.comment.text) throw new Error('there is not comment.text in body')
                })
                .expect(200)
                .then((res) => {
                    commentId = res.body.comment.id
                    done()
                })
                .catch((err) => done(err))
        })
    })

    describe(`PUT /api/comment`, () => {
        it('Edit comment', (done) => {
            let editComment = { text: 'test comment edit', id: commentId }
            request(app)
                .put(`/api/comment`)
                .send(editComment)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    if (!res.body.comment) throw new Error('there is not comment in body')
                    if (!res.body.comment.id) throw new Error('there is not comment.id in body')
                    if (!res.body.comment.text) throw new Error('there is not comment.text in body')
                    if (editComment.text !== res.body.comment.text)
                        throw new Error('text not edited in comment')
                })
                .expect(200)
                .then(() => {
                    done()
                })
                .catch((err) => done(err))
        })
    })

    describe(`GET /api/comment/:blogId`, () => {
        it('Get blog comments', (done) => {
            request(app)
                .get(`/api/comment/${blogId}`)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    if (!res.body.comments) throw new Error('there is not comments in body')
                    if (!Array.isArray(res.body.comments)) throw new Error('comments is not array')
                })
                .expect(200)
                .then(() => {
                    done()
                })
                .catch((err) => done(err))
        })
    })
})

describe('Clear Test Data', () => {
    describe(`DELETE /api/blog`, () => {
        it('Delete blog', (done) => {
            request(app)
                .delete(`/api/blog`)
                .send({ id: blogId })
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    if (!res.body.blog) throw new Error('there is not blog in body')
                    if (!res.body.blog.id) throw new Error('there is not blog.id in body')
                })
                .expect(200)
                .then(() => {
                    done()
                })
                .catch((err) => done(err))
        })
    })

    describe(`DELETE /api/comment`, () => {
        it('Delete comment', (done) => {
            request(app)
                .delete(`/api/comment`)
                .send({ id: commentId })
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    if (!res.body.comment) throw new Error('there is not comment in body')
                    if (!res.body.comment.id) throw new Error('there is not comment.id in body')
                })
                .expect(200)
                .then(() => {
                    done()
                })
                .catch((err) => done(err))
        })
    })
})
