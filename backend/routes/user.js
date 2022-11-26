const express = require('express')
const userRouter = express.Router()
const { User } = require('../models')

userRouter
  .route('/')
  .get((req, res, next) =>
    Promise.resolve()
      .then(() => User.find({}))
      .then((data) => res.status(200).json(data))
      .catch((err) => next(err))
  )
  .post((req, res, next) => Promise.resolve()
  .then(() => new User(req.body).save())
  .then((user) => res.status(201).json(user))
  .catch((err) => next(err))
)

module.exports = userRouter