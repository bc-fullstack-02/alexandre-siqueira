const express = require('express')
const securityRouter = express.Router()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const removePassword = require('../helpers')

const { User, Profile } = require('../models')
const JWT_PASS = process.env.JWT_PASS || 'acessq1w2e3r4password'

securityRouter.route('/register')
.post((req, res, next) => Promise.resolve()
    .then(() => bcrypt.hash(req.body.password, 10))
    .then((passHashed) => new User({ ...req.body, password: passHashed }).save())
    .then((user) => new Profile({ name: req.body.name || req.body.user, user: user._id }).save()
        .then((profile) => User.findByIdAndUpdate(user._id, { profile })))
    .then((user) => removePassword(user)) // function to remove password from helpers.js
    .then((user) => res.status(201).json(user))
    .catch((err) => next(err))
)

securityRouter.route('/login')
.post((req, res, next) => Promise.resolve()
    .then(() => User.findOne({ user: req.body.user }))
    .then((user) => user ? {passHashed: bcrypt.compare(req.body.password, user.password), user} : next(createError(404)))
    .then(({ passHashed, user }) => passHashed ? jwt.sign(JSON.stringify(removePassword(user)), JWT_PASS) : next(createError(401)))
    .then((token) => token ? res.status(200).json({token}) : next(createError(401)))
    .catch(err => next(err))
)

module.exports = securityRouter
