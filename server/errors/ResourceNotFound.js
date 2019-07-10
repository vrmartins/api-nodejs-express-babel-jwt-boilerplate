/**
 * @param {string} message Error message
 * @param {int} status Error status code
 * @return {Error} ResourceNotFound Error ResourceNotFound
 */
class ResourceNotFound extends Error {
  /**
   * @param  {...any} args
   */
  constructor (...args) {
    super(...args)
    this.name = 'ResourceNotFound'
    this.status = args[1] || 404
    this.message = args[0] || 'not found'
    Error.captureStackTrace(this, ResourceNotFound)
  }
}

module.exports = {
  ResourceNotFound: ResourceNotFound
}
