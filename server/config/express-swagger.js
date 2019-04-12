const startup = (app) => {
  if (process.env.NODE_ENV === 'production') return false;

  const expressSwagger = require('express-swagger-generator')(app);

  const options = {
    swaggerDefinition: {
      info: {
        title: 'Boilerplate Documentation',
        version: '0.0.1',
        description: 'Boilerplate documentation',
      },
      host: `localhost:${process.env.APP_PORT}`,
      basePath: '/api',
      produces: ['application/json'],
      schemes: ['http', 'https'],
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: '',
        },
      },
    },
    basedir: __dirname,
    files: ['../routes/**/*.js'],
    route: {
      url: '/api-docs',
      docs: '/api-docs.json',
    },
  };

  expressSwagger(options);
};

export default {startup};
