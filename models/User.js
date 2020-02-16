const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
var gravatar = require('gravatar');
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  user = this
  if (user.password && user.isModified('password')) {
    console.log(user.password)
    user.password = await bcrypt.hash(user.password, 10)
    next()
  }
  next()
})

//generate avatar image
userSchema.pre('save', async function (next) {
  var user = this
  var url = await gravatar.url(user.email, { protocol: 'http', s: '200', r: 'pg', d: 'mm' });
  user.avatar = url
  next()
})

//verify pw
userSchema.methods.verifyPassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}


module.exports = mongoose.model('User', userSchema)