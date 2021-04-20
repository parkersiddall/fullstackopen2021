const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
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

const testUser = {
    username: 'testuser',
    password: 'password',
}

let token = null

beforeEach(async () => {
    // empty test DB
    await User.deleteMany({})
    await Blog.deleteMany({})

    // create test user and get token
    await api
    .post('/api/users')
    .send(testUser)

    const resp = await api
    .post('/api/login')
    .send(testUser)

    token = resp.body.token

    // create user
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

const api = supertest(app)

test('blogs are returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two tests', async () => {

    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blog author is Bob Dole', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

    expect(response.body[0].author).toBe('Bob Dole')
})

test('blogs have unique identifier property', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('delete blog', async () => {
    const newBlog = {
        title: "New Blog",
        author: "New Blog Author",
        url: "www.google.com",
        likes: 0
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
    
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    console.log('AAYYAYAY', response.body)

    await api
    .delete(`/api/blogs/${response.body[2].id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)
})

test('update post, primarily for changing likes', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    const blogId = response.body[0].id
    await api
    .put(`/api/blogs/${blogId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
        title: "More likes",
        author: "test",
        url: "www.google.com",
        likes: 100
    })
    .expect(200)

    const checkChange = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    expect(checkChange.body[0].likes).toBe(100)
})


test('returns unathorized without token', async () => {
    
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    console.log('AAYYAYAY', response.body)

    await api
    .delete(`/api/blogs/${response.body[0].id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(401)
})

afterAll(() => {
    mongoose.connection.close()
})