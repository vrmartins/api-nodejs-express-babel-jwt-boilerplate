<<<<<<< HEAD
// require('dotenv-safe').load()
=======
require("dotenv-safe").load();
>>>>>>> feat(docker): Run lint after merge feature/docker
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "Boilerplate Documentation",
      version: "0.0.1",
      description: "Boilerplate documentation",
    },
    host: `localhost:${process.env.APP_PORT}`,
    basePath: "/api"
  },
  apis: ["server/routes/*"]
};

const specs = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.get("/swagger.json", (req, res) => {
    res.json(specs);
  });
};

