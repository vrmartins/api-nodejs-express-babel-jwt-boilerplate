require("dotenv-safe").load();

import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import expressSwagger from "./config/express-swagger";
import mongoose from "mongoose";
import errorHandling from "./middlewares/error-handling";

const app = express();

const database_uri = function () {
  if (process.env.NODE_ENV !== "production") return `mongodb://${process.env.DATABASE_ADDRESS}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
  return `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_ADDRESS}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
}();

mongoose.connect(database_uri, { useNewUrlParser: true });

// parse body params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

expressSwagger.startup(app);

errorHandling(app);

export default app;