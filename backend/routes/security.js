const express = require('express')
const securityRouter = express.Router()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const removePassword = require('../helpers')

const { User, Profile } = require('../models')
const TOKEN_PASS = process.env.TOKEN_PASS || 'acessq1w2e3r4password'

securityRouter.route('/register').post((req, res, next) => Promise.resolve()
    .then(() => bcrypt.hash(req.body.password, 10))
    .then((passHashed) => new User({ ...req.body, password: passHashed }).save())
    .then((user) => new Profile({ name: req.body.name, user: user._id, password: user.password }).save()
        .then((profile) => User.findByIdAndUpdate(user._id, { profile }))
    )
    .then((user) => removePassword(user)) // function to remove password from helpers
    .then((user) => res.status(201).json(user))
    .catch((err) => next(err))
)

securityRouter.route('/login').post((req, res, next) => Promise.resolve()
    .then(() => User.findOne({ user: req.body.user }))
    .then((user) => user ? 
          {
            password: bcrypt.compare(req.body.password, user.password),
            profile_id: user.profile,
            user_id: user.id
          } : next(createError(404)))
    .then(({ password, userId, profileId }) => password ? 
      jwt.sign({ id: userId, user: req.body.user, profile: { id: profileId } }, TOKEN_PASS) 
      : next(createError(400)))
    .then((token) => token ? res.status(201).json({ token }) : next(createError(400)))
    .catch((err) => next(err))
)

module.exports = securityRouter