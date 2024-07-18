const prisma = require('../prisma/prisma_client')

module.exports = async (req, res) => {

  const {id:postId,commentId} = req.params
  if (!postId) {
    return res.status(400).json({error:'No Post ID provided'})
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    })
    if (!post) {
      return res.status(400).json({error:"Post with given ID doesn't exist"})
    } 
    
    if (!commentId) {
      return res.status(400).send({ error: 'Invalid Comment ID' })
    }
    const comment = await prisma.comment.delete({
      where: {
        id:commentId
      }
    })
    const comments = prisma.comment.updateMany({
      where: {
        parentCommentId:commentId
      },
      data: {
        parentCommentId:comment.parentCommentId
      }
    })

    

    res.status(204).json({message:'Comment deleted successfully'})
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal Server/Network Error'})
  }
}