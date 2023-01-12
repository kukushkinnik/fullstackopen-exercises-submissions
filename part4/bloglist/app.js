const express = require("express");
const app = express();
const { info, error } = require("./utils/logger");
const { MONGODB_URI } = require("./utils/config");
const blogRouter = require("./controllers/blog");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
require("express-async-errors");

info(`Connecting to MongoDB ${MONGODB_URI}`);
mongoose
  .connect(MONGODB_URI)
  .then(() => info("Connected"))
  .catch((er) => error(er.message));

app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
