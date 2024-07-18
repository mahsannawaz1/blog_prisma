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
      },
      include: {
        comments: true,
        likes:true
      }
    })
    if (!post) {
      return res.status(400).json({error:"Post with given ID doesn't exist"})
    } 
    res.status(200).json({post})
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"Internal Server/Network Error"})
  }
}