const { Schema, model } = require('mongoose')

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2
  },
  image: {
    type: Boolean,
    default: true
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPicture: {
    type: String,
    default: "",
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }]
})
profileSchema.index({ name: 'text' })
module.exports = model('Profile', profileSchema)