class ResourceNotFound extends Error {
  constructor (...args) {
    super(...args);
    this.name = "ResourceNotFound";
    this.status = args[1] || 404;
    this.message = args[0] || "not found";
    Error.captureStackTrace(this, ResourceNotFound);
  }
}

module.exports = {
  ResourceNotFound: ResourceNotFound
};
