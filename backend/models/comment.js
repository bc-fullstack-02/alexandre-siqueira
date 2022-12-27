const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
  description: {
    type: String,
    required: true,
    minLength: 2
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  },
  profile: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Profile'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }
  ]
})

module.exports = model('Comment', commentSchema)