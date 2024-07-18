const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace("Bearer ","")
  if (!token) {
    return res.status(401).json({error:'Access denied. No token provided'})
  }
  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decodedPayload
    next()
  } catch (error) {
    res.status(403).json({error:'Invalid token'})
  }
}