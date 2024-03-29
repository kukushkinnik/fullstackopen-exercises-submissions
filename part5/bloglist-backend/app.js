const express = require("express");
const app = express();
const { info, error } = require("./utils/logger");
const { MONGODB_URI } = require("./utils/config");
const blogRouter = require("./controllers/blog");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
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
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);

module.exports = app;
