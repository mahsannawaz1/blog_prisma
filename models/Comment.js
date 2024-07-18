const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  title:{
    type: String,
    max:50
  },
  content: {
    type: String,
    required: true,
    max:200
  },
  commentedAt: {
    type: Date,
    default:Date.now
  },
  commentedPost: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Post',
    required:true
  },
  commentedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required:true
  }
})

module.exports = mongoose.model('Comment', CommentSchema)