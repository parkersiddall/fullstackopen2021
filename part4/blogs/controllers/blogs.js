const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', middleware.extractToken, middleware.extractUser, async (request, response) => {
  const body = request.body

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: 'title and url are mandatory' })
  }

  if (body.likes === undefined) {
    body.likes = 0
  }

  const user = request.user

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.delete('/:id', middleware.extractToken, middleware.extractUser, async (request, response) => {
  const body = request.body

  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user != request.user.id) {
    console.log('BLOG USER', blogToDelete.user, 'REQUEST USER', request.user.id)
    return response.status(401).json({ error: 'not your post. cannot delete.' })
  }

  const user = request.user
  const result = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', middleware.extractToken, middleware.extractUser, async (request, response) => {
  const body = request.body
  
  if(body.likes === undefined) {
    response.status(400)
  }
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updateBlog)
})

module.exports = blogsRouter