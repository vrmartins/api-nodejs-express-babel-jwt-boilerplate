require('dotenv-safe').load()

import app from './app';

// start app on PORT
app.listen(process.env.APP_PORT, () => console.log(`Started server on ${process.env.APP_PORT}`));