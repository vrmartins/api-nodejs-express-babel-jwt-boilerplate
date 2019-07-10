import logger from '../logger'
import { Error } from 'mongoose'

/**
 * @param {Object} app Express Router
 */
function errorHandling (app) {
  Error.DocumentNotFoundError.prototype.status = 404
  Error.ValidationError.prototype.status = 422

  app.use((error, request, response, next) => {
    if (error instanceof Error.ValidationError) {
      logger.warn('ValidationError', { error })
      return response.status(error.status).json({ error })
    }

    const knownErrors = [
      'ResourceNotFound',
      'UnauthorizedError',
      'ValidationError'
    ]

    // TODO: Remove duplicated logger.warn()
    if (knownErrors.includes(error.name)) {
      logger.warn(error.name, { error })
      return response.status(error.status || 400).json({ error })
    }

    logger.error('An unknown error ocurred ===> ', { error })

    return response.status(500).json({ message: 'Unexepected error' })
  })
}

export default errorHandling
