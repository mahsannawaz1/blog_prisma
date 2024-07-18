const Post = require('../models/Post')
const prisma = require('../prisma/prisma_client')

module.exports = async (req, res) => {
  const { page=1 ,pageSize=5 } = req.query
  try {
    // const posts = await Post.find().limit(pageSize).skip((page - 1) * pageSize).sort({ postedAt: -1 })
    const posts = await prisma.post.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: {
        postedBy:'desc'
      }
    })
    res.status(200).json({posts})
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal Server/Network Error'})
  }
}