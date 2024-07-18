const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    max: 100,
    required:true
  },
  content: {
    type: String,
    max:999,
    required:true
  },
  postedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    unique:false
  },
  image: {
    type: String,
    required:true
  },
  postedAt: {
    type: Date,
    default:Date.now
  }
})

module.exports = mongoose.model('Post', PostSchema)