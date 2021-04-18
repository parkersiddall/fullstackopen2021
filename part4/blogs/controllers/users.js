const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.username === undefined || body.password === undefined) {
        response.status(400).send({
            message: 'username and password must be provided'
        })
    }

    // password tested in controller to avoid issues validating hashed password
    if (body.password.length < 3) {
        response.status(400).send({
            message: 'password must be more than 3 characters'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    // username validation is done with mongoose. This block returns errors if necessary.
    try {
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })

        const savedUser = await user.save()  // this is giving me a strange message in jest
        response.json(savedUser)
    }
    catch (e) {
        response.status(400).send({
            message: e.message
        })
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter