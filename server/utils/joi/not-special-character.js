/* eslint-disable no-useless-escape */

function notSpecialCharacter (joi) {
  return {
    name: 'string',
    base: joi.string(),
    language: {
      notSpecialCharacter: 'Invalid special characteres'
    },
    rules: [{
      name: 'notSpecialCharacter',
      params: {
        notSpecialCharacter: joi.string()
      },
      validate (params, value, state, options) {
        if (value.length !== value.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, '').length) {
          return this.createError('string.notSpecialCharacter', { value, notSpecialCharacter: '' }, state, options)
        }
        return value
      }
    }]
  }
}

export { notSpecialCharacter }
