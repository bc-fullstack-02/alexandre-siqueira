const express = require('express')
const securityRouter = express.Router()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const removePassword = require('../helpers')
const upload = require('../lib/upload')

const { User, Profile } = require('../models')
const JWT_PASS = process.env.JWT_PASS || 'acessq1w2e3r4password'

securityRouter.route('/register')
.post(upload.concat([(req, res, next) => Promise.resolve()
    .then(() => bcrypt.hash(req.body.password, 10))
    .then((passHashed) => new User({ ...req.body, password: passHashed }).save())
    .then((user) => new Profile({ 
            name: req.body.name || req.body.user, 
            email: req.body.email,
            image: req.body.image,
            imageUrl: req.body.imageUrl,
            user: user._id}).save()
        .then((profile) => User.findByIdAndUpdate(user._id, { profile })))
    .then((user) => removePassword(user)) // function to remove password from helpers.js
    .then((user) => res.status(201).json(user))
    .catch((err) => next(err))]))

securityRouter.route('/login')
.post((req, res, next) => Promise.resolve()
        .then(() => User.find({}))
        .then(() => User.findOne({ user: req.body.user }).populate('profile')
        .then(data => {
            data ? bcrypt.compare(req.body.password, data.password)
                .then(passwordHash => {
                    var token = {
                        accessToken: jwt.sign({
                            name: data.name,
                            user: data.user,
                            profile_id: data.profile._id.toString(),
                        }, JWT_PASS)
                    }
                    passwordHash ? res.status(201).json(token) : next(createError(401))
                }) : next(createError(401))
        })
        .catch((err) => next(err))))

module.exports = securityRouter
