const express = require('express')
const createError = require('http-errors')
const profileRouter = express.Router()

const { Post } = require('../models')

profileRouter.route('/')
  .get((req, res, next) => Promise.resolve()
    .then(() => Post.find({ profile: req.user.profile._id}).populate('comments').populate('profile'))
    .then((data) => res.status(200).json(data))
    .catch(err => next(err)))

  .post((req, res, next) => Promise.resolve()
    .then(() => new Post({ ...req.body, profile: req.user.profile._id }).save())
    .then((data) => res.status(200).json(data))
    .catch(err => next(err)))

profileRouter.route('/:id')
  .get((req, res, next) => Promise.resolve()
    .then(() => Post.findById(req.params.id).populate('profile').populate({ path: 'comments'}))
    .then((data) => data ? res.status(200).json(data) : next(createError(404)))
    .catch(err => next(err)))
  
  .put((req, res, next) => Promise.resolve()
    .then(() => Post.findByIdAndUpdate( req.params.id, req.body, { runValidators: true, new: true }))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err)))

  .delete((req, res, next) => Promise.resolve()
    .then(() => Post.deleteOne({ _id: req.params.id }))
    .then((data) => res.status(204).json(data))
    .catch(err => next(err)))

profileRouter.route('/:id/like')
  .post((req, res, next) => Promise.resolve()
    .then(() => Post.findByIdAndUpdate({ _id: req.params.id }, { $push: { likes: req.user.profile._id }}, { runValidators: true, new: true }))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err)))

profileRouter.route('/:id/unlike')
  .post((req, res, next) => Promise.resolve()
    .then(() => Post.findByIdAndUpdate({ _id: req.params.id }, { $pull: { likes: req.user.profile._id }}, { runValidators: true, new: true }))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err)))


module.exports = profileRouter

