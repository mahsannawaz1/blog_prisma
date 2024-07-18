const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({
  likedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    unique:false
  },
  likedPost: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Post',
    required: true,
    unique:false
  }
})

module.exports = mongoose.model('Like', LikeSchema)