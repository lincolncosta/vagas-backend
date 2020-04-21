const Joi = require('@hapi/joi')

const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(255)
    .trim()
    .required(),
  email: Joi.string()
    .email()
    .trim()
    .required(),
  password: Joi.string()    
    .trim()
    .min(6)
    .required(),
  isAdmin: Joi.boolean()
  
})

module.exports = {
  validate(user) {
    return schema.validate(user, { stripUnknown: true, abortEarly: false })
  }
}