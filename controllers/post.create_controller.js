const validatePost = require('../utils/validation.post_comment')
const Post = require('../models/Post')
const uploadOnCloudinary = require('../utils/cloudinary.upload')
const prisma = require('../prisma/prisma_client')

module.exports = async (req, res) => {
  const { value:{ title,content }, error } = validatePost(req.body)
  if (error) {
    return res.status(400).json({error:error.details[0].message})
  }
  try {
    const response = await uploadOnCloudinary(req.file.path)
    // const post = Post({
    //   title,
    //   content,
    //   postedBy: req.user._id,
    //   image:response.url
    // })
    // await post.save()
    const post = await prisma.post.create({
      data: {
        title,
        content,
        postedBy: req.user.id,
        image:response.url
      }
    })
    res.status(201).json({post})
  } catch (error) {
    res.status(500).json({error:'Internal Server/Network Error'})
  }
  
}