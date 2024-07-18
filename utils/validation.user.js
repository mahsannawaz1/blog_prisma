const Joi = require('joi')

const UserSchema = {
  'REGISTER': Joi.object({
    username: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password:Joi.string().required().min(6)
  }),
  'LOGIN': Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().required().min(6)
  })
}

module.exports = (userData, actionType) => {
  const schema = UserSchema[actionType]
  if (!schema)
    return null
  return schema.validate(userData)
}