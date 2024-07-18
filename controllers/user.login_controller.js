const validateUser = require('../utils/validation.user')
const prisma = require('../prisma/prisma_client')
const comparePassword = require('../utils/comparePassword')
const generateToken = require('../utils/generateToken')
const User = require('../models/User')

module.exports = async (req, res) => {
  const { value:{ email,password },error } = validateUser(req.body,'LOGIN')
  if (error) {
    return res.status(400).json({error:error.details[0].message})
  }
  try {
    // const user = await User.findOne({ email })
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({error:'Incorrect email or password'})
    }
    // const isCorrectPass = user.comparePassword(password)
    const isCorrectPass = await comparePassword(password, user.password)
    
    if (!isCorrectPass) {
      return res.status(400).json({error:'Incorrect email or password'})
    }
    const token = generateToken(user)
    console.log(token)
    res.status(200).
      header('Authorization', `Bearer ${token}`).
      json({ message: 'User logged in successfully'})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal Serval/Network error'})
  }
  
}