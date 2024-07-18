
const Like = require('../models/Like')
const Post = require('../models/Post')
const prisma = require('../prisma/prisma_client')

module.exports = async (req, res) => {
  const postId = req.params.id
  if (!postId) {
    return res.status(400).json({error:'No Post ID provided'})
  }
  // const post = await Post.findById(postId)
  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  })
  if (!post) {
    return res.status(400).json({error:"Post with given ID doesn't exist"})
  } 
  // const like = await Like.findOne({ likedBy: req.user._id, likedPost: post._id })
  const like = await prisma.like.findUnique({
    where: {
      likedBy: req.user.id,
      likedPost:post.id
    }
  })
  if (like) {
    return res.status(400).json({error:'User already liked the post'})
  }
  try {
    // const like = Like({
    //   likedBy: req.user._id,
    //   likedPost:post._id
    // })
    // await like.save()
    const like = await prisma.like.create({
      data: {
        likedBy: req.user.id,
        likedPost:post.id
      }
    })
    res.status(201).json({ like })
  } catch (error) {
    res.status(500).json({error:'Internal Server/Network error'})
  }

}
