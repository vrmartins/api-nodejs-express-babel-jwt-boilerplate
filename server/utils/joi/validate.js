const Joi = require('@hapi/joi')

const validate = (schema, disableSanitize = false) => {
  return (request, response, next) => {
    Object.keys(schema).forEach((key) => {
      const { error } = Joi.validate(request[key], schema[key])
      next(error)
    })
  }
}

export default validate
