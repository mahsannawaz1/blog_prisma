const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const _ = require('lodash')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max:10
  },
  email: {
    type: String,
    required: true,
    unique:true,
    max:20
  },
  password: {
    type: String,
    min:6,
    required:true
  },
  profile: {
    type: String,
    required:true
  },
  createdAt: {
    type: Date,
    default:Date.now
  }
})

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    _.omit(this.toObject(), 'password'),
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1hr' }
  )
  return token
}

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
