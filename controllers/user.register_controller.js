const validateUser = require('../utils/validation.user')
const uploadOnCloudinary = require('../utils/cloudinary.upload')
const hashedPassword = require('../utils/hashPassword')
const prisma = require('../prisma/prisma_client')
const User = require('../models/User')

module.exports = async (req, res) => {
  const { value:{ username,email,password:simplePassword }, error } = validateUser(req.body,'REGISTER')
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }    
  try {  
    const response = await uploadOnCloudinary(req.file.path)
    console.log('res: ',response)
    // let user = await User.findOne({ email })
    let user = await prisma.user.findUnique({
      where:{ email }
    })
    if (user) {
      return res.status(400).json({error:'User with entered email already exists.'})
    }
    const password = await hashedPassword(simplePassword)
    // user = User({
    //   username,
    //   email,
    //   password,
    //   profile:response.url
    // })
    // await user.save()
    user = await prisma.user.create({
      data: {
        username,
        email,
        password,
        profile:response.url
      }
    })
    res.status(201).json({message:'User created successfully'})
  } catch (err) {
    console.log(req.file.profile)
    console.log(err)
    res.status(500).json({error:'Internal Server/Network Error'})
  }
}