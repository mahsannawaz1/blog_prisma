const Post = require('../models/Post')
const prisma = require('../prisma/prisma_client')

module.exports = async (req, res) => {
  const { page=1 ,pageSize=5 } = req.query
  try {
    // const posts = await Post.find().limit(pageSize).skip((page - 1) * pageSize).sort({ postedAt: -1 })
    const posts = await prisma.post.findMany({
      // take: pageSize,
      // skip: (page - 1) * pageSize,
      orderBy: {
        postedBy:'desc'
      },
      include: {     
          user: {
            select: {
              id: true,
              email: true,
              profile:true
            }
        },
        
        comments: {
          
          select: {
            title: true,
            content: true,
            user: {
              select: {
                id: true,
                username: true,
                email:true,
                profile: true
              }
            }
          },
          where: {
            AND: [
              {
               parentCommentId:null
              },
              {
                user: {
                  email: {
                   endsWith:'@gmail.com'
                 }
               }
              }
            ],
          },
          
        },
        likes: {
          select: {
            user: {
              select: {
                id: true,
                profile: true,
                username: true
              }
            }
          }
        }
      }
    })
    res.status(200).json({posts})
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal Server/Network Error'})
  }
}