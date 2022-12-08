const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    minLength: 2
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 2
  },
  image: {
    type: Boolean,
    default: false
  },
  user: {
    type: String,
    unique: true,
    required: true,
    minLength: 2
  },
  password: {
    type: String,
    required: true,
    minLength: 2
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
})

module.exports = model('User', userSchema)