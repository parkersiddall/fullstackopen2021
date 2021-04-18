const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
  })

const api = supertest(app)

test('new user added successfully', async () => {
    await api
    .post(`/api/users`)
    .send({
        username: "BobDole",
        name: "Bob Dole",
        password: "password"
    })
    .expect(200)
})


test('password too short', async () => {
    await api
    .post(`/api/users`)
    .send({
        username: "BobDole",
        name: "Bob Dole",
        password: "f"
    })
    .expect(400)
})

test('username too short', async () => {
    await api
    .post(`/api/users`)
    .send({
        username: "f",
        name: "Bob Dole",
        password: "f"
    })
    .expect(400)
})


afterAll(() => {
    mongoose.connection.close()
})