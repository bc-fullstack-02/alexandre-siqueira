const express = require('express')
const createError = require('http-errors')
const profileRouter = express.Router()
const upload = require('../lib/upload')

const { Profile } = require('../models')

profileRouter.route('/')
.get((req, res, next) => Promise.resolve()
  .then(() => Profile.find({}))
  .then((data) => res.status(200).json(data))
  .catch((err) => next(err)))

.put(upload.concat([(req, res, next) => Promise.resolve()
  .then(() =>  Profile.findByIdAndUpdate(req.profile.id, req.body, { runValidators: true, new: true}))
  .then((args) => req.publish('profile', req.user.profile.followers, args))
  .then((data) => res.status(201).json(data))
  .catch(err => next(err))]))

profileRouter.route('/search')
.get((req, res, next) => Promise.resolve()
  .then(() => Profile.find(
    { $text: { $search: `${req.query.q}` } }, 
    { score: { $meta: "textScore" } }).sort( { score: { $meta: "textScore" } } ))
  .then((data) => data ? res.status(200).json(data) : next(createError(404)))
  .catch((err) => next(err)))

profileRouter.route('/:id')
.get((req, res, next) => Promise.resolve()
  .then(() => Profile.findById(req.params.id).populate(['following', 'followers']))
  .then((data) => data ? res.status(200).json(data) : next(createError(404)))
  .catch((err) => next(err)))

profileRouter.route('/:id/follow')
.post((req, res, next) => Promise.resolve()
  .then(() => Profile.findOneAndUpdate(
      { _id: req.params.id }, { $addToSet: { followers: req.user.profile._id}}, { new: true }))
  .then(() => Profile.findOneAndUpdate(
      { _id: req.user.profile._id }, { $addToSet: { following: req.params.id}}, { new: true }))
  .then((data) => res.status(203).json(data))
  .catch((err) => next(err)))

profileRouter.route('/:id/unfollow')
.post((req, res, next) => Promise.resolve()
  .then(() => Profile.findOneAndUpdate(
    { _id: req.params.id }, { $pull: { followers: req.user.profile._id}}, { new: true }))
  .then(() => Profile.findOneAndUpdate(
    { _id: req.user.profile._id }, { $pull: { following: req.params.id}}, { new: true }))
  .then((data) => res.status(203).json(data))
  .catch((err) => next(err)))

module.exports = profileRouter