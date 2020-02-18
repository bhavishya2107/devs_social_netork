const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      date:{
        type:Date,
        default:Date.now
      }
    }
  ],
  date:{
    type:Date,
    default:Date.now
  }
})

module.exports = mongoose.model('Post', postSchema)