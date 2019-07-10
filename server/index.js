import logger from './logger'

import app from './app'
require('dotenv-safe').load()

// start app on PORT
app.listen(
  process.env.APP_PORT,
  () => logger.info(
    `Started server on ${process.env.APP_PORT} in ${process.env.NODE_ENV}`)
)
