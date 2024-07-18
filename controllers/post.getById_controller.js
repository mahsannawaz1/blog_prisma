const Post = require('../models/Post')
const Like = require('../models/Like')
const Comment = require('../models/Comment')
const prisma = require('../prisma/prisma_client')

module.exports = async (req, res) => {
  const postId = req.params.id
  if (!postId) {
    return res.status(400).json({error:'No Post ID provided'})
  }
  console.log(postId)
  try {
    // const post = await Post.findById(postId)
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    })
    if (!post) {
      return res.status(400).json({error:"Post with given ID doesn't exist"})
    } 
    // const comments = await Comment.find({ commentedPost: post._id })
    const comments = await prisma.comment.findMany({
      where: {
        commentedPost:post.id
      }
    })
    // const likes = await Like.find({ likedPost: post._id })
    const likes = await prisma.like.findMany({
      where: {
        likedPost:post.id
      }
    })
    res.status(200).json({
      post: { 
        ...post,
        comments,
        likes
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"Internal Server/Network Error"})
  }
}