require('dotenv-safe').load();
import logger from './logger';

import app from './app';

// start app on PORT
app.listen(
    process.env.APP_PORT,
    () => logger.info(
        `Started server on ${process.env.APP_PORT} in ${process.env.NODE_ENV}`)
);
