const jwt = require('jsonwebtoken')
const _ = require('lodash')

module.exports = (user) => {
  console.log(user)
  const token = jwt.sign(
    _.omit(user, 'password'),
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1 day' }
  )
  return token
}