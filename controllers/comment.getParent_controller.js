
const prisma = require('../prisma/prisma_client')

module.exports = async (req, res) => {
  const postId = req.params.id
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
    let comments =[]
    if (req.body.parentCommentId) {
        comments = await prisma.comment.findMany({
          where: {
            parentCommentId:req.body.parentCommentId
          }
        })
    }
    else {
      res.status(400).send({error:'Invalid parent comment.'})
    }

    res.status(200).json({comments})
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal Server/Network Error'})
  }
}