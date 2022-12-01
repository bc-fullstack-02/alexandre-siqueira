const express = require('express')
const userRouter = express.Router()
const { User } = require('../models')
const removePassword = require('../helpers')

userRouter
  .route('/me')
   .get((req, res, next) => Promise.resolve()
   .then(() => User.findById(req.user.id))
   .then((data) => data ? res.status(200).json(removePassword(data)) : next(createError(404)))
   .catch((err) => next(err)))

  .put((req, res, next) => Promise.resolve()
     .then(() =>  User.findByIdAndUpdate(req.user.id, req.body, { runValidators: true, new: true}))
     .then((user) => res.status(203).json(user))
     .catch((err) => next(err)))

  .delete((req, res, next) => Promise.resolve()
     .then(() => User.deleteOne({ _id: req.user.id }))
     .then((data) => res.status(200).json(data))
     .catch((err) => next(err))
)

module.exports = userRouter