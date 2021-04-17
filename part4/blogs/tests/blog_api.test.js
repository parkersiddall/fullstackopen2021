const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: "React Patterns",
        author: "Bob Dole",
        url: "www.google.com",
        likes: 10
    },
    {
        title: "React test",
        author: "Parker",
        url: "www.parker.com",
        likes: 10
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

const api = supertest(app)

test('blogs are returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two tests', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blog author is Bob Dole', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].author).toBe('Bob Dole')
})

test('blogs have unique identifier property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('new blog added successfully', async () => {
    const newBlog = {
        title: "New Blog",
        author: "New Blog Author",
        url: "www.google.com",
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const author = response.body.map(r => r.author)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(author).toContain('New Blog Author')
})

test('zero is set when likes not defined', async () => {
    const newBlog = {
        title: "New Blog",
        author: "New Blog Author",
        url: "www.google.com",
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const author = response.body.map(r => r.author)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(response.body[2].likes).toBeDefined()

})

test('missing url and title return bad request', async () => {
    const newBlog = {
        author: "New Blog Author",
        url: "www.google.com",
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('delete blog', async () => {
    const response = await api.get('/api/blogs')

    await api
    .delete(`/api/blogs/${response.body[0].id}`)
    .expect(204)
})

test('update post, primarily for changing likes', async () => {
    const response = await api.get('/api/blogs')
    const blogId = response.body[0].id
    await api
    .put(`/api/blogs/${blogId}`)
    .send({
        title: "More likes",
        author: "test",
        url: "www.google.com",
        likes: 100
    })
    .expect(200)

    const checkChange = await api.get('/api/blogs')
    expect(checkChange.body[0].likes).toBe(100)
})

afterAll(() => {
    mongoose.connection.close()
})