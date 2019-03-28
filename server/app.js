require("dotenv-safe").load();

import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import swaggerDoc from "./swaggerDoc";
import mongoose from "mongoose";

const app = express(); // new server

mongoose.connect(`mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_ADDRESS}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`, { useNewUrlParser: true });

// parse body params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/swagger', express.static(__dirname + '/public/api-docs/'))

app.use("/api", routes);

swaggerDoc(app);

export default app;