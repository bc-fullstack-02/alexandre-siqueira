const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const JWT_PASS = process.env.JWT_PASS || 'acessq1w2e3r4password'
const { User } = require('../models')
const removePassword = require('../helpers')

const authUser = (req, res, next) => Promise.resolve()
  .then(() => req.headers.authorization)  
  .then((authHeader) =>	authHeader ? authHeader.split(' ')[1] : next(createError(401)))
  .then((token) =>	token ? jwt.verify(token, JWT_PASS) : next(createError(403)))
  .then((user) => User.findOne(user).populate("profile"))
  .then((loggedUser) => req.user = loggedUser)
  .then(() => next())

module.exports = authUser