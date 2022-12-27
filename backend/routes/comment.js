const express = require("express");
const commentRouter = express.Router();
const createError = require("http-errors");
const { Comment, Post } = require("../models");

commentRouter
  .param("postId", (req, res, next, id) => Promise.resolve()
      .then(() => Post.findById(id))
      .then((post) => post ? next() : next(createError(404)))
      .catch((err) => next(err))
  )
  .route("/:postId/comments")
  .get((req, res) =>Promise.resolve()
      .then(() => Comment.find({ post: req.params.postId }).populate("profile"))
      .then((data) => res.status(200).json(data.sort(function(a,b){ return new Date(b.createAt) - new Date(a.createAt)})))
      .catch((err) => next(err))
  )
  .post((req, res, next) => Promise.resolve()
      .then(() => new Comment(Object.assign(
            { ...req.body, profile: req.user.profile._id },
            { post: req.params.postId }
          )).save())
      .then((comment) => Post.findById(comment.post)
          .then((post) => Object.assign(post, { comments: [...post.comments, comment._id] }))
          .then((post) => Post.findByIdAndUpdate(comment.post, post, { runValidators: true, new: true }))
          .then(args => req.publish('comment', [args.profile], args))
      .then((data) => res.status(201).json(data))
      .catch((err) => next(err)))
  )

commentRouter
  .param("postId", (req, res, next, id) => Promise.resolve()
      .then(() => Post.findById(id))
      .then((post) => post ? next() : next(createError(404)))
      .catch((err) => next(err)))

  .route("/:postId/comments/:id")
  .get((req, res, next) => Promise.resolve()
      .then(() => Comment.findById(req.params.id).populate('profile'))
      .then((data) => data ? res.status(200).json(data) : next(createError(404)))
      .catch(err => next(err)))
    
  .put((req, res, next) => Promise.resolve()
      .then(() => Comment.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true }))
      .then((data) => res.status(203).json(data))
      .catch(err => next(err)))
  
  .delete((req, res, next) => Promise.resolve()
      .then(() => Comment.deleteOne({ _id: req.params.id }))
      .then((data) => res.status(204).json(data))
      .catch(err => next(err)))

commentRouter
  .param("postId", (req, res, next, id) => Promise.resolve()
      .then(() => Post.findById(id))
      .then((post) => post ? next() : next(createError(404)))
      .catch((err) => next(err)))

  .route("/:postId/comments/:id/like")
  .post((req, res, next) => Promise.resolve()
    .then(() => Comment.findByIdAndUpdate({ _id: req.params.id }, { $addToSet: { likes: req.user.profile._id }}, { runValidators: true, new: true }))
    .then(args => req.publish("comment-like", [args.profile], args))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err)))


commentRouter
  .param("postId", (req, res, next, id) =>
    Promise.resolve()
      .then(() => Post.findById(id))
      .then((post) => post ? next() : next(createError(404)))
      .catch((err) => next(err))
  )
  .route("/:postId/comments/:id/unlike")
  .post((req, res, next) => Promise.resolve()
      .then(() => Comment.findByIdAndUpdate({ _id: req.params.id }, { $pull: { likes: req.user.profile._id }}, { runValidators: true, new: true }))
      .then((data) => res.status(203).json(data))
      .catch(err => next(err)))

module.exports = commentRouter;
