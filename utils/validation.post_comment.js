const Joi = require('joi')

module.exports = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().max(100),
    content: Joi.string().required().max(999),
  })
  return schema.validate(data)
}
