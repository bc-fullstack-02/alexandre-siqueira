const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const JWT_PASS = process.env.JWT_PASS || 'acessq1w2e3r4password'
const { User } = require('../models')

const authUser = (req, res, next) => Promise.resolve()
    .then(() => req.headers.authorization ? next() : next(createError(401)))
    .then(() => req.headers.authorization.split(' ')[1])
    .then((token) => jwt.verify(token, JWT_PASS) ? next() : next(createError(403)))
    .then((user) => User.findOne(user).popule('profile').then( u => { req.user = u; next()}))
    .catch((err) => next(err))

module.exports = authUser