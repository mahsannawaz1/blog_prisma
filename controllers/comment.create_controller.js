const Comment = require('../models/Comment')
const Post = require('../models/Post')
const validateComment = require('../utils/validation.post_comment')
const prisma = require('../prisma/prisma_client')

module.exports = async (req, res) => {
  const commentObj = {
    title: req.body.title,
    content:req.body.content
  }
  const { value:{title,content}, error } = validateComment(commentObj)
  if (error) {
    return res.status(400).json({error:error.details[0].message})
  }
  const postId = req.params.id
  if (!postId) {
    return res.status(400).json({error:'No Post ID provided'})
  }
  // const post = await Post.findById(postId)
  const post = await prisma.post.findUnique({
    where: {
      id:postId,
    }
  })
  if (!post) {
    return res.status(400).json({error:"Post with given ID doesn't exist"})
  } 

  let parentCommentId = null
  if (req.body.parentCommentId) {
      const parentComment = await prisma.comment.findUnique({
        where: {
          id:req.body.parentCommentId
        }
      })
      if (!parentComment) {
        return res.status(400).json({error:'Parent comment not found'})
      }
      parentCommentId = req.body.parentCommentId
  }
  try {
    // const comment = Comment({
    //   title,
    //   content,
    //   commentedBy: req.user._id,
    //   commentedPost:post._id
    // })
    // await comment.save()
    
    
    const comment = await prisma.comment.create({
      data: {
        title,
        content,
        parentCommentId,
        commentedBy: req.user.id,
        commentedPost:post.id
      }
    })
    res.status(201).json({ comment })
  } catch (error) {
    res.status(500).json({error:'Internal Server/Network error'})
  }

}